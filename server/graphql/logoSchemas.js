var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');


var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            texts: {
                type: new GraphQLList(GraphQLString)
            },
            textLocations: {
                type: new GraphQLList(new GraphQLList(GraphQLInt))
            },
            textColors: {
                type: new GraphQLList(GraphQLString)
            },
            fontSizes: {
                type: new GraphQLList(GraphQLInt)
            },
            images: {
                type: new GraphQLList(GraphQLString)
            },
            imageLocations: {
                type: new GraphQLList(new GraphQLList(GraphQLInt))
            },
            imageDimensions: {
                type: new GraphQLList(new GraphQLList(GraphQLInt))
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderWidth: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            dimensions: {
                type: new GraphQLList(GraphQLInt)
            },
            location: {
                type: new GraphQLList(GraphQLInt)
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

// var userType = new GraphQLObjectType({
//     name: 'User',
//     fields: function () {
//         return{
//             _id: {
//                 type: GraphQLString
//             },
//             userID: {
//                 type: GraphQLString
//             },
//             userName: {
//                 type: GraphQLString
//             },
//             password: {
//                 type: GraphQLString
//             },
//             data: {
//                 type: new GraphQLList(logoType)
//             },
//         }
//     }
// })

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            getLogoByText: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: params.text}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
            getLogosByTextContains: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: {$regex: params.text, $options: 'i'}}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    texts: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    textLocations: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    textColors: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    fontSizes: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    },
                    images: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    imageLocations: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    imageDimensions: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    dimensions: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    },
                    location: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    texts: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    textLocations: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    textColors: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    fontSizes: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    },
                    images: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                    },
                    imageLocations: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    imageDimensions: {
                        type: new GraphQLNonNull(new GraphQLList(new GraphQLList(GraphQLInt)))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    dimensions: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    },
                    location: {
                        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        { texts: params.texts, textLocations: params.textLocations, textColors: params.textColors, fontSizes: params.fontSizes,
                            images: params.images, imageLocations: params.imageLocations, imageDimensions: params.imageDimensions, backgroundColor : params.backgroundColor, borderColor : params.borderColor,
                            borderWidth: params.borderWidth, borderRadius: params.borderRadius, dimensions:params.dimensions,
                             location: params.location, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });