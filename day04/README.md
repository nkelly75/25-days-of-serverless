# Day 4

## Approach
-   Use Cosmos DB to store "dishes" for the potluck
-   One Azure Function per API
-   Use bindings on Azure Functions where possible
-   A dish has 3 simple properties: name, id (uuid) and friend (who's bringing the dish)

The HTTP API has the following routes:
-   /dishes, GET, retrieves all dishes (function: 'GetDishes')
-   /dishes, POST, adds a new dish to the list - details in Body (function: 'CreateDishes')
-   /dishes/{id}, PUT, changes an existing dish (by id) (function: 'ChangeDish')
-   /dishes/{id}, DELETE, removes a dish (by id) (function: 'RemoveDish')

## Challenges
The bindings worked out very well for 3 out of 4 functions. I couldn't find docs on how to use bindings to delete records (they may not exist...). So in RemoveDish/index.js I had to resort to lower-level use of the @azure/cosmos module. Got this working (there are some things like DB name, Collection name that should really be externalized to config..).

CosmosDB concept of PartitionKey. Figured the 'friend' property of the dishes would be a good candidate for partition key. This worked well in general. In order to delete a record I needed to also provide the partition key. API clients shouldn't need to pass the 'friend' name for deletion so ended up querying by ID to get the 'friend' and then using both to delete.

## Examples
Postman collection is included in this directory (see day4.postman_collection.json). Here's a sequence of calls and responses:

```
# Bob's bringing salad
POST /api/dishes
{
	"name": "salad",
	"friend": "bob"
}

200
{
  "name": "salad",
  "friend": "bob",
  "id": "51951450-16f3-11ea-9a80-2780d2f08824"
}

# Irene's bringing two dishes
POST /api/dishes
{
	"name": "pavlova",
	"friend": "irene"
}

POST /api/dishes
{
	"name": "fruit salad",
	"friend": "irene"
}

# Check the list so far
GET /api/dishes

[
  {
    "id": "51951450-16f3-11ea-9a80-2780d2f08824",
    "name": "salad",
    "friend": "bob"
  },
  {
    "id": "8b97d930-16f3-11ea-9a80-2780d2f08824",
    "name": "pavlova",
    "friend": "irene"
  },
  {
    "id": "b48069c0-16f3-11ea-9a80-2780d2f08824",
    "name": "fruit salad",
    "friend": "irene"
  }
]

# Bob change's his mind
PUT /api/dishes/51951450-16f3-11ea-9a80-2780d2f08824
{
	"name": "ribs",
	"friend": "bob"
}

# Irene drops the fruit salad
DELETE /api/dishes/b48069c0-16f3-11ea-9a80-2780d2f08824

# Check the list again
GET /api/dishes

[
  {
    "id": "51951450-16f3-11ea-9a80-2780d2f08824",
    "name": "ribs",
    "friend": "bob"
  },
  {
    "id": "8b97d930-16f3-11ea-9a80-2780d2f08824",
    "name": "pavlova",
    "friend": "irene"
  }
]
```

Here's a screenshot of the 2 corresponding items in the Cosmos 'potluck' collection:

![Cosmos Items](/day04/cosmosItems.png)
