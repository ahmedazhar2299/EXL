package com.exl;

import java.util.ArrayList;
import java.util.List;

public class DirectoryNode {
    private String name;
    private List<DirectoryNode> children;

    public DirectoryNode(String name) {
        this.name = name;
        this.children = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public List<DirectoryNode> getChildren() {
        return children;
    }

    public void addChild(DirectoryNode child) {
        children.add(child);
    }
}
