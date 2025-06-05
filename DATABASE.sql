CREATE DATABASE BlogApiDB;
USE BlogApiDB;

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,  
    Username NVARCHAR(100) NOT NULL,   
    Password NVARCHAR(100) NOT NULL,    
    CreatedAt DATETIME DEFAULT GETUTCDATE()  
);


CREATE TABLE Blogs (
    Id INT IDENTITY(1,1) PRIMARY KEY,    
    UserId INT NOT NULL,                  
    Title NVARCHAR(200) NOT NULL,       
    Content NVARCHAR(MAX) NOT NULL,       
    ImageUrl NVARCHAR(500) NULL,          
    CreatedAt DATETIME DEFAULT GETUTCDATE(),  
    FOREIGN KEY (UserId) REFERENCES Users(Id)  
);