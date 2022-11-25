describe("Dashboard Page Test Cases", () =>{
    it("Do Login with Correct values", () =>{
        cy.visit("http://localhost:3000");

        const email = cy.get("input[name='email']");
        email.type("user@react.test");

        const password = cy.get("input[name='password']");
        password.type("password");

        const button = cy.get("button");
        button.click();
        
        cy.on("window:alert", (text) => {
            expect(text).to.contains("welcome");
        });

        cy.url().should("eq", "http://localhost:3000/dashboard");
    });

    it("Found No Post for the First Time",() =>{
        cy.contains("Found 0 photos")
    });

    it("Contains Image url and description input, and Publish button", () => {
        // //check image
        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr", "type", "url");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "Image URL");

        //check description
        const description = cy.get("input[name='desc']");
        description.should("be.visible"); 
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");

        //check publish button
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Upload Some Photos", () =>{
        const photos = [
            {
                imageValue: "https://images.unsplash.com/photo-1668942576149-6ed5ba3c1bb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                descriptionValue: "Image 1: Lorem Ipsum",
            },
            {
                imageValue: "https://images.unsplash.com/photo-1669250740534-1e26fb77051d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
                descriptionValue: "Image 2: Lorem Ipsum",
            }  
        ];

        photos.forEach(({imageValue, descriptionValue}) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']")
            description.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            //check uploaded image is exists
            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(descriptionValue);
        });

        cy.contains(`Found ${photos.length} photos`);
    })
});