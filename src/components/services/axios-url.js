import dotenv from "dotenv";
dotenv.config();

// export default window.BaseUrl = "http://104.248.150.20:8080";
// export default window.BaseUrl = "http://localhost:8080";
// export default window.BaseUrl = "https://zeepsapis.herokuapp.com";
export default window.BaseUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;
