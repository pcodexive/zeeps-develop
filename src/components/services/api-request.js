export function API(variables, apiName, apiMethod) {
  // const baseUrl="http://localhost:5050/";
  // const baseUrl="https://teetung-server.herokuapp.com/";
  const baseUrl = "http://localhost:8080/";
  var init =
    apiMethod === "GET"
      ? {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      : {
          method: apiMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variables),
        };
  // console.log(" apiRequest   =>"+JSON.stringify(variables));
  // console.log(variables);
  // console.log(baseUrl + apiName + apiMethod);

  return fetch(baseUrl + apiName, init)
    .then((response) =>
      response.json().then((responseData) => {
        return responseData;
      })
    )
    .catch((err) => {
      return { responseMessage: "다시 시도해주세요.", err: err };
    });
}

export default API;
