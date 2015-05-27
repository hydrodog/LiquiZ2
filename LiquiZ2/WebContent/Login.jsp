<%@ page contentType="text/html" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
    
    <head>
        <title>
            Sign-up Page
        </title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
        />
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media
        queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js">
            </script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js">
            </script>
        <![endif]-->
    </head>
    
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <form class="form-signin" role="form" action="LoginJudge.jsp">
                        <h2 class="form-signin-heading">
                            Please sign in
                        </h2>
                        <input type="text" class="form-control" name="userName" placeholder="User name" required="" autofocus="" />
                        <input type="password" class="form-control" name="passwd" placeholder="Password" required=""/>
                        <input type="checkbox" value="remember-me" />
                        <b>
                            Remember me
                        </b>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">
                            Sign in
                        </button>
                    </form>
                     <button class="btn btn-lg btn-primary btn-block" onclick="javascript:window.location.href='register.jsp'">
                            Sign up
                      </button>
                </div>
            </div>
        </div>
        <!-- /container -->
    </body>

</html>