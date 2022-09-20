  module.exports =() => {
    const responseHandler = async (_req, res, next) => {
      const formattedResponse = {
        success: true,
      };
      if(res.locals.errors) {
          formattedResponse.success = false;
          formattedResponse.errors = res.locals.errors;
      }else{
        formattedResponse.data = res.locals.data;
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.json(formattedResponse);
    }
    return {
      responseHandler
    }
  };
