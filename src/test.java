
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import com.google.gson.Gson;
@WebServlet("/test")
public class test extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Greeting greeting = new Greeting("Hello, World!");
        Gson gson = new Gson();
        String json = gson.toJson(greeting);
        response.getWriter().write(json);
    }

    private class Greeting {
        private String message;
        private String[] bobo = new String[2];

        public Greeting(String message) {
            this.message = message;
            bobo[0] = "asg";
            bobo[1] = "sad";
        }

        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
    }
}