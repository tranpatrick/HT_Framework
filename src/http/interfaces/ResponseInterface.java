package http.interfaces;

import http.Cookie;

/**
 * interface representant un objet response HTTP
 */
public interface ResponseInterface {
    void addHeader(String fieldName, String value);
    void setStatusCode(int statusCode);
    void addCookie(Cookie cookie);
    int getStatusCode();
    Object getBody();
    void setBody(Object body);

    @Override
    String toString();
}
