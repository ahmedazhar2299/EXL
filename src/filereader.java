import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import jakarta.servlet.*;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import javax.xml.parsers.*;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.*;



import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@WebServlet("/filereader")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10, // 10MB
        maxRequestSize = 1024 * 1024 * 50 // 50MB
)
public class filereader extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        Part filePart = request.getPart("xml");
        InputStream fileContent = filePart.getInputStream();
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(fileContent);

            // Get the data from the XML file
            Element marketplaceElement = document.getDocumentElement();
            NodeList categoryNodes = marketplaceElement.getElementsByTagName("Category");

            for (int i = 0; i < categoryNodes.getLength(); i++) {
                Element categoryElement = (Element) categoryNodes.item(i);
                String categoryName = categoryElement.getElementsByTagName("Name").item(0).getTextContent();
                NodeList subcategoryNodes = categoryElement.getElementsByTagName("Subcategory");

                for (int j = 0; j < subcategoryNodes.getLength(); j++) {
                    Element subcategoryElement = (Element) subcategoryNodes.item(j);
                    String subcategoryName = subcategoryElement.getElementsByTagName("name").item(0).getTextContent();
                    String brandName = subcategoryElement.getElementsByTagName("brand").item(0).getTextContent();
                    String modelName = subcategoryElement.getElementsByTagName("model").item(0).getTextContent();
                    String fileName = "file.xml";
                    String city = subcategoryElement.getElementsByTagName("city").item(0).getTextContent();
                    String directoryPath = "E:/marketplace/" + city + "/" + categoryName + "/" + subcategoryName + "/" + brandName + "/" + modelName;
                    Files.createDirectories(Paths.get(directoryPath));

                    // Save the XML file
                    File file = new File(directoryPath, fileName);
                    try (OutputStream outputStream = new FileOutputStream(file)) {
                        TransformerFactory transformerFactory = TransformerFactory.newInstance();
                        Transformer transformer = transformerFactory.newTransformer();
                        DOMSource source = new DOMSource(categoryElement);
                        StreamResult result = new StreamResult(outputStream);
                        transformer.transform(source, result);
                    }

                    // Save the images
                    String imagesFolderPath = directoryPath + "/images";
                    Files.createDirectories(Paths.get(imagesFolderPath));

                    // Save the images
                    for (int k = 1; k <= 3; k++) {
                        Part imagePart = request.getPart("image" + k);
                        if (imagePart != null) {
                            String imageName = imagePart.getSubmittedFileName();
                            try (InputStream imageContent = imagePart.getInputStream()) {
                                File imageFile = new File(imagesFolderPath, imageName);
                                Files.copy(imageContent, imageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                            }
                        }
                    }
                }
            }

            // Return a success response
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("Data saved successfully.");
        } catch (Exception e) {
            // Handle any errors that occurred during XML parsing or file handling
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error occurred: " + e.getMessage());
        }
    }

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