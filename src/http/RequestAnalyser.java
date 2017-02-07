package http;

import http.Method;
import http.Request;

import java.util.HashMap;
import java.util.Scanner;

/**
 * Created by patrick.tran on 07/02/2017.
 */
public class RequestAnalyser {

    public static Request analyse(String request){
        Request res;
        Method method = null;
        String url = "";
        HashMap<String, String> headers = new HashMap<>();
        Scanner scanner = new Scanner(request);
        String line;
        String[] tab;

        // Getting the METHOD
        if(scanner.hasNextLine()) {
            line = scanner.nextLine();
            tab = line.split(" ");
            if (tab != null) {
                method = Method.valueOf(tab[0]);
                url = tab[1];
            }
        }

        // Getting the headers
        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            tab = line.split(": ");
            headers.put(tab[0], tab[1]);
        }

        // Getting the URL
        url = headers.get("Host") + url;

        // Getting the cookies ??

        res = new Request(url, method, headers, null);

        return res;
    }


}
