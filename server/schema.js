import  axios from 'axios'; 
const graphqlObjType = require ('graphql');
const {
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
  } = require('graphql');
const LaunchType = new graphqlObjType(
    {
        name:'Launch',
        fields: ()=>({
            flight_number: { type: GraphQLInt },
            mission_name: { type: GraphQLString },
            launch_year: { type: GraphQLString },
            launch_date_local: { type: GraphQLString },
            launch_success: { type: GraphQLBoolean },
            rocket: { type: RocketType }
        })
    });

const RocketType = new graphqlObjType({
    name:'Rocket',
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }

});

const RootQuery = new graphqlObjType({
    name:'rocketQueryType',
    fields:{
        Launches:{
            type: new GraphQLList(LaunchType),
            resolve(parent, args)
            {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        }
    }
});