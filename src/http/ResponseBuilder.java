package http;

import server.HttpServer;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by ladislas on 21/02/2017.
 */
public class ResponseBuilder {

//    public static Response internalServerError(int statusCode, String templateFileName, string path)


    public static Response serverResponse(int statusCode, String path) {
//        Response response = new Response();
//        response.setStatusCode(statusCode);
//        String msg = StatusCode.getDescription(statusCode);
//        response.setBody(msg);
//        response.addHeader(Headers.CONTENT_TYPE, Headers.TEXT_PLAIN); //HTML ?
//        response.addHeader(Headers.CONTENT_LENGTH, msg.length()+"");

        Response response = new Response();

        try {
            response = new Response();
            response.setStatusCode(StatusCode.NOT_FOUND);
            Charset charset = StandardCharsets.UTF_8;
            Path templatePath = Paths.get(HttpServer.errorPageTemplatePath);
            String content = new String(Files.readAllBytes(templatePath), charset);
            content = content.replace("%ERRORCODE%", statusCode + "");
            content = content.replace("%PATH%", path);
            content = content.replace("%STATUSMSG%", StatusCode.getDescription(statusCode));
            response.setBody(content);
            response.addHeader(Headers.CONTENT_TYPE, Headers.TEXT_HTML);
            response.addHeader(Headers.CONTENT_LENGTH, response.getBody().toString().length()+"");
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        return response;
    }
}
