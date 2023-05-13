import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import com.exl.DirectoryTree;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

@WebServlet("/products/*")
public class products extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        String requestURI = request.getRequestURI();
        String ROOT_DIRECTORY = "E:\\marketplace";
        DirectoryTree tree = new DirectoryTree(ROOT_DIRECTORY);
        List<String> directoryList;
        if (requestURI.startsWith("/exl/products/approve/")) {
            String filterPath = requestURI.substring("/exl/products/approve/".length()).replaceAll("%20", " ");
            directoryList = tree.filterLeafNodePaths(DirectoryTree.rootNode,ROOT_DIRECTORY,filterPath.replace("/","\\"));
                File directory = new File(directoryList.get(0));
                if (directory.exists() && directory.isDirectory()) {
                    File[] files = directory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                    for (File file : files) {
                        String targetFileName = "approved.xml";
                        if (!file.getName().equals(targetFileName)) {
                            String newFilePath = directoryList.get(0) + File.separator + targetFileName;
                            File newFile = new File(newFilePath);
                            if (file.renameTo(newFile)) {
                                response.getWriter().println("XML file renamed successfully.");
                            } else {
                                response.getWriter().println("Failed to rename XML file.");
                            }
                            return;
                        }
                        else {
                            response.getWriter().println("Failed already approved!.");
                        }
                    }
            }
        }
        else if (requestURI.startsWith("/exl/products/unapprove/")) {
            String filterPath = requestURI.substring("/exl/products/unapprove/".length()).replaceAll("%20", " ");;
            directoryList = tree.filterLeafNodePaths(DirectoryTree.rootNode,ROOT_DIRECTORY,filterPath.replace("/","\\"));
            File directory = new File(directoryList.get(0));
            if (directory.exists() && directory.isDirectory()) {
                File[] files = directory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                for (File file : files) {
                    String targetFileName = "unapproved.xml";
                    if (!file.getName().equals(targetFileName)) {
                        String newFilePath = directoryList.get(0) + File.separator + targetFileName;
                        File newFile = new File(newFilePath);
                        if (file.renameTo(newFile)) {
                            response.getWriter().println("XML file renamed successfully.");
                            return;
                        } else {
                            response.getWriter().println("Failed to rename XML file.");
                            return;
                        }
                    }
                }
            }
        }
        else {
            response.getWriter().println("Invalid directory path.");
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");
        String requestURI = request.getRequestURI();
        JSONObject json = new JSONObject();
        String ROOT_DIRECTORY = "E:\\marketplace";
        PrintWriter out = response.getWriter();
        DirectoryTree tree = new DirectoryTree(ROOT_DIRECTORY);
        List<String> directoryList = tree.getAllLeafNodePaths(DirectoryTree.rootNode,ROOT_DIRECTORY);
        List<JSONObject> jsonList = new ArrayList<>();


        if (requestURI.equals("/exl/products/all/pending")) {
            for(int i=0;i<directoryList.size();i++){
                File rootDirectory = new File(directoryList.get(i));

                if (rootDirectory.exists() && rootDirectory.isDirectory()) {
                    File[] files = rootDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                    for (File file : files) {
                        if(file.getName().equals("pending.xml")){
                            String xmlContent = readFileContent(file);
                            JSONObject xmlJsonObj = XML.toJSONObject(xmlContent);
                            JSONObject extractedData = extractDataFromXmlJson(xmlJsonObj);
                            String imageDirectoryPath = file.getParent() + File.separator + "images";
                            File imageDirectory = new File(imageDirectoryPath);
                            if (imageDirectory.exists() && imageDirectory.isDirectory()) {
                                File[] imageFiles = imageDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".png"));
                                JSONArray imagesArray = new JSONArray();
                                for (File imageFile : imageFiles) {
                                    try {
                                        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
                                        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                                        imagesArray.put(base64Image);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }
                                extractedData.put("images", imagesArray);
                            }

                            jsonList.add(extractedData);
                        }
                    }
                }
            }
            json.put("products", jsonList.toArray());
            out.print(json);
            out.flush();
        }
        else if (requestURI.equals("/exl/products/all/approved")) {
            for(int i=0;i<directoryList.size();i++){
                File rootDirectory = new File(directoryList.get(i));

                if (rootDirectory.exists() && rootDirectory.isDirectory()) {
                    File[] files = rootDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                    for (File file : files) {
                        if(file.getName().equals("approved.xml")){
                            String xmlContent = readFileContent(file);
                            JSONObject xmlJsonObj = XML.toJSONObject(xmlContent);
                            JSONObject extractedData = extractDataFromXmlJson(xmlJsonObj);
                            String imageDirectoryPath = file.getParent() + File.separator + "images";
                            File imageDirectory = new File(imageDirectoryPath);
                            if (imageDirectory.exists() && imageDirectory.isDirectory()) {
                                File[] imageFiles = imageDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".png"));
                                JSONArray imagesArray = new JSONArray();
                                for (File imageFile : imageFiles) {
                                    try {
                                        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
                                        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                                        imagesArray.put(base64Image);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }
                                extractedData.put("images", imagesArray);
                            }

                            jsonList.add(extractedData);
                        }
                    }
                }
            }
            json.put("products", jsonList.toArray());
            out.print(json);
            out.flush();
        }
        else if (requestURI.equals("/exl/products/all/unapproved")) {
            for(int i=0;i<directoryList.size();i++){
                File rootDirectory = new File(directoryList.get(i));

                if (rootDirectory.exists() && rootDirectory.isDirectory()) {
                    File[] files = rootDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                    for (File file : files) {
                        if(file.getName().equals("unapproved.xml")){
                            String xmlContent = readFileContent(file);
                            JSONObject xmlJsonObj = XML.toJSONObject(xmlContent);
                            JSONObject extractedData = extractDataFromXmlJson(xmlJsonObj);
                            String imageDirectoryPath = file.getParent() + File.separator + "images";
                            File imageDirectory = new File(imageDirectoryPath);
                            if (imageDirectory.exists() && imageDirectory.isDirectory()) {
                                File[] imageFiles = imageDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".png"));
                                JSONArray imagesArray = new JSONArray();
                                for (File imageFile : imageFiles) {
                                    try {
                                        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
                                        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                                        imagesArray.put(base64Image);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }
                                extractedData.put("images", imagesArray);
                            }

                            jsonList.add(extractedData);
                        }
                    }
                }
            }
            json.put("products", jsonList.toArray());
            out.print(json);
            out.flush();
        }
        else if (requestURI.startsWith("/exl/products/filter/")) {
            String filterPath = requestURI.substring("/exl/products/filter/".length()).replaceAll("%20", " ");;
            directoryList = tree.filterLeafNodePaths(DirectoryTree.rootNode,ROOT_DIRECTORY,filterPath.replace("/","\\"));
            for(int i=0;i<directoryList.size();i++){
                File rootDirectory = new File(directoryList.get(i));
                if (rootDirectory.exists() && rootDirectory.isDirectory()) {
                    File[] files = rootDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
                    for (File file : files) {
                        if(file.getName().equals("approved.xml")){
                            String xmlContent = readFileContent(file);
                            JSONObject xmlJsonObj = XML.toJSONObject(xmlContent);
                            JSONObject extractedData = extractDataFromXmlJson(xmlJsonObj);
                            String imageDirectoryPath = file.getParent() + File.separator + "images";
                            File imageDirectory = new File(imageDirectoryPath);
                            if (imageDirectory.exists() && imageDirectory.isDirectory()) {
                                File[] imageFiles = imageDirectory.listFiles((dir, name) -> name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".png"));
                                JSONArray imagesArray = new JSONArray();
                                for (File imageFile : imageFiles) {
                                    try {
                                        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
                                        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                                        imagesArray.put(base64Image);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                }
                                extractedData.put("images", imagesArray);
                            }

                            jsonList.add(extractedData);
                        }
                    }
                }
            }
            json.put("products", jsonList.toArray());
            out.print(json);
            out.flush();
        }
        else if (requestURI.startsWith("/exl/products/cities")){
            directoryList = tree.getFirstLevelDirectories();
            JSONObject list = new JSONObject();
            list.put("cities", directoryList.toArray());
            json.put("b", list);
            out.print(list);
            out.flush();
        }
        else if (requestURI.startsWith("/exl/products/categories")){
            List<Map<String, List<String>>> categoryMap = tree.getCategoriesMapping();
            Gson gson = new Gson();
            String jsonString = gson.toJson(categoryMap);

            JsonObject j = new JsonObject();
            j.add("categories", gson.fromJson(jsonString, JsonElement.class));

            String outputJson = gson.toJson(j);
            out.print(outputJson);
            out.flush();
        }
        else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private String readFileContent(File file) throws IOException {
        try (FileInputStream fis = new FileInputStream(file)) {
            byte[] data = new byte[(int) file.length()];
            fis.read(data);
            return new String(data, "UTF-8");
        }
    }

    private JSONObject extractDataFromXmlJson(JSONObject xmlJsonObj) {
        JSONObject categoryObj = xmlJsonObj.getJSONObject("Category");
        JSONObject subcategoryObj = categoryObj.getJSONObject("Subcategories").getJSONObject("Subcategory");

        JSONObject jsonObj = new JSONObject();
        jsonObj.put("category", categoryObj.getString("Name").toLowerCase());
        jsonObj.put("subcategory", subcategoryObj.getString("name").toLowerCase());
        jsonObj.put("description", subcategoryObj.getString("description").toLowerCase());
        jsonObj.put("brand", subcategoryObj.getString("brand").toLowerCase());
        jsonObj.put("model", subcategoryObj.getString("model").toLowerCase());
        jsonObj.put("color", subcategoryObj.getString("color").toLowerCase());
        jsonObj.put("price", subcategoryObj.getInt("price"));
        jsonObj.put("city", subcategoryObj.getJSONObject("location").getString("city").toLowerCase());
        jsonObj.put("address", subcategoryObj.getJSONObject("location").getString("address"));

        return jsonObj;
    }
}