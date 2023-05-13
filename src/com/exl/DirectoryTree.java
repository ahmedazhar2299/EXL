package com.exl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class DirectoryTree {
    public static DirectoryNode rootNode;
    public DirectoryTree(String ROOT_PATH) {
        File rootDir = new File(ROOT_PATH);
        if (!rootDir.exists()) {
            System.out.println("Root directory does not exist");
            return;
        }
        rootNode = createDirectoryTree(rootDir);
    }

    private static DirectoryNode createDirectoryTree(File directory) {
        DirectoryNode node = new DirectoryNode(directory.getName());
        File[] subDirectories = directory.listFiles(File::isDirectory);
        if (subDirectories != null) {
            for (File subDirectory : subDirectories) {
                if (subDirectory.getName().equals("images")) {
                   break;
                } else {
                    DirectoryNode childNode = createDirectoryTree(subDirectory);
                    node.addChild(childNode);
                }
            }
        }
        return node;
    }
    public List<String> getAllLeafNodePaths(DirectoryNode node, String currentPath) {
       List<String> leafPaths =  new ArrayList<String>();
        if (node.getChildren().isEmpty()) {
            leafPaths.add(currentPath);
        } else {
            for (DirectoryNode child : node.getChildren()) {
                String childPath = currentPath + File.separator + child.getName();
                List<String> childLeafPaths = getAllLeafNodePaths(child, childPath);
                leafPaths.addAll(childLeafPaths);
            }
        }
        return leafPaths;
    }

    public List<String> filterLeafNodePaths(DirectoryNode node, String currentPath, String inputString) {
        List<String> leafPaths =  new ArrayList<String>();
        if (node.getChildren().isEmpty()) {
            if (currentPath.contains(inputString)) {
                leafPaths.add(currentPath);
            }
        } else {
            for (DirectoryNode child : node.getChildren()) {
                String childPath = currentPath + File.separator + child.getName();
                List<String> childLeafPaths = filterLeafNodePaths(child, childPath,inputString);
                leafPaths.addAll(childLeafPaths);
            }
        }

        return leafPaths;
    }

    public static void printDirectoryTree(DirectoryNode node, String indent) {
        System.out.println(indent + node.getName());
        for (DirectoryNode child : node.getChildren()) {
            printDirectoryTree(child, indent + "  ");
        }
    }

    public List<String> getFirstLevelDirectories() {
        List<String> firstLevelDirectories = new ArrayList<>();
        for (DirectoryNode child : rootNode.getChildren()) {
            firstLevelDirectories.add(child.getName());
        }
        return firstLevelDirectories;
    }

    private void collectSubcategories(DirectoryNode node, Map<String, List<String>> categoriesMap) {
        for (DirectoryNode child : node.getChildren()) {
            String category = child.getName();
            List<String> subcategories = categoriesMap.get(category);

            if (subcategories == null) {
                subcategories = new ArrayList<>();
            }

            for (DirectoryNode grandChild : child.getChildren()) {
                subcategories.add(grandChild.getName());
            }

            categoriesMap.put(category, subcategories);
        }
    }

    private List<Map<String, List<String>>> getCatoriesbySubcategories() {
        List<Map<String, List<String>>> result = new ArrayList<>();

        for (DirectoryNode child : rootNode.getChildren()) {
            Map<String, List<String>> categoriesMap = new HashMap<>();
            collectSubcategories(child, categoriesMap);
            result.add(categoriesMap);
        }

        return result;
    }

    public List<Map<String, List<String>>> getCategoriesMapping() {
        List<Map<String, List<String>>> content = getCatoriesbySubcategories();
        Map<String, List<String>> combinedCategories = new HashMap<>();

        for (Map<String, List<String>> categoryMap : content) {
            for (Map.Entry<String, List<String>> entry : categoryMap.entrySet()) {
                String category = entry.getKey();
                List<String> subcategories = entry.getValue();

                combinedCategories.putIfAbsent(category, new ArrayList<>());
                combinedCategories.get(category).addAll(subcategories);
            }
        }

        List<Map<String, List<String>>> result = new ArrayList<>();
        for (Map.Entry<String, List<String>> entry : combinedCategories.entrySet()) {
            String category = entry.getKey();
            List<String> subcategories = entry.getValue();

            Map<String, List<String>> categoryMap = new HashMap<>();
            categoryMap.put(category, subcategories);
            result.add(categoryMap);
        }
        return result;
    }
}
