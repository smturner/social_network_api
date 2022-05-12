# social_network_api

need to create a user model
    -username, email, thoughts, friends
    -figure out self-referencing
    -readme has all the info for the model

create a virtual(look this up) that retrieves the length of user's friend array and length of thought's reactions array

need to create a thoughts model
    -thoughtText, createdAt, username, reactions


create inside thoughts model, reactions
    -reactionId, reactionBody, username, createdAt

create routes for /api/users:
    -get for all users
    -get for single user by id with thought and friend data
    -post a new user
        example: 'username', 'email' (look at readme)
    -put to update user by id
    -delete to remove user by id
**bonus remove user's thoughts when deleted

create routes for: /api/user/:userId, api/user/friends, api/user/friends/:friendId
    -post to add a new friend to a user's friend list
    -delete to remove a friend form a user's friend list

create route for: /api/thoughts
    -get all thoughts
    -get a single thought by it's id
    -post create a new thought-->push created thought's id to the associated user's thoughts array field (look at readme for example)
    -put to update a thougth by its id
    -delete to remove a thought by its id

create route for: /api/thoughts/:thoughtId/reactions
    -post to create a reaction stored in a single  thought's reaction array field
    -delete to pull and remove a reaction by the reaction's reactionid value
    