package http;

/**
 * Entetes du protocole HTTP
 */
public class Headers {

    // Pour la gestion du Content-Type, il faudra gerer le cas ou on recoit
    // Content-Type: text/html; charset=UTF-8

    public static final String CONTENT_TYPE = "Content-Type";
    public static final String CONTENT_LENGTH = "Content-Length";
    public static final String TEXT_PLAIN = "text/plain";
    public static final String TEXT_HTML = "text/html";
    public static final String TEXT_CSS = "text/CSS";
    public static final String APPLICATION_JS = "application/javascript";
    public static final String APPLICATION_JSON = "application/json";
    public static final String HOST = "Host";
    public static final String DATE = "Date";
    public static final String ACCEPT = "Accept";
    public static final String SET_COOKIE = "Set-Cookie";
    public static final String COOKIE = "Cookie";
    public static final String USER_AGENT = "User-Agent";



}
