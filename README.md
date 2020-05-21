## There are the updated queries for GraphiQL

Get all information about all logos:

    query{
        logos {
            _id
            texts
            textLocations
            textColors
            fontSizes
            images
            imageLocations
            imageDimensions
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }

Get one logo using its ID:

    query{
        logo(id: "----ID OF LOGO----") {
            _id
            texts
            textLocations
            textColors
            fontSizes
            images
            imageLocations
            imageDimensions
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            dimensions
            padding
            margin
            lastUpdate
        }
    }

Create a new logo:

    mutation{
        addLogo(
            texts: ["GoLogoLo"],
            textLocations: [[150,100]],
            textColors: ["#FF1211"],
            fontSizes: [40],
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"],
            imageLocations: [[200,200]],
            imageDimensions: [[100,100]],
            backgroundColor: "#22ffff",
            borderColor: "#0000ff",
            borderRadius: 30,
            borderWidth: 10,
            dimensions: [500,500],
            padding: 10,
            margin:20
        ){
            lastUpdate
        }
    }

Edit an existing logo:

    mutation{
        updateLogo(
            id: "----ID OF LOGO TO UPDATE----",
            texts: ["GoLogoLo","NEW"],
            textLocations: [[150,100],[180,350]],
            textColors: ["#FF1211", "#ffffff"],
            fontSizes: [40,50],
            images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"],
            imageLocations: [[200,200]],
            imageDimensions: [[100,100]],
            backgroundColor: "#22ffff",
            borderColor: "#0000ff",
            borderRadius: 30,
            borderWidth: 10,
            dimensions: [500,500],
            padding: 10,
            margin:20
        ){
            lastUpdate
        }
    }


Remove an existing logo:

    mutation{
        removeLogo(
            id: "----ID OF LOGO TO REMOVE----"
        ){
            lastUpdate
        }
    }