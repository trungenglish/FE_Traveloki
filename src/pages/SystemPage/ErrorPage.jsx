import { Link, useRouteError } from "react-router-dom";
import { Result, Button } from "antd";

export const ErrorPage = () =>{
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="403"
        title="Oops!"
        subTitle={error.statusText || error.message}
        extra={<Button type="primary">
          <Link to="/">
          <span>Back to homepage</span>
          </Link>
      </Button>}
    />
  );
}