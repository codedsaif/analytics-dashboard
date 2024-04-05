1.  Create a project

    ```
    npm init -y
    ```

2.  Install json-server

    ```
    npm install json-server
    ```

3.  Run Json Server

    ```
    npx json-server db.json
    ```

4.  Requests

    ```
    GET    /posts
    GET    /posts/:id
    POST   /posts
    PUT    /posts/:id
    PATCH  /posts/:id
    DELETE /posts/:id

    GET   /profile
    PUT   /profile
    PATCH /profile
    ```

5.  Params

    ```
    Conditions
    → ==
    lt → <
    lte → <=
    gt → >
    gte → >=
    ne → !=
    GET /posts?views_gt=9000

    Range
    start
    end
    limit
    GET /posts?_start=10&_end=20
    GET /posts?_start=10&_limit=10
    Paginate
    page
    per_page (default = 10)
    GET /posts?_page=1&_per_page=25
    Sort
    _sort=f1,f2
    GET /posts?_sort=id,-views
    Nested and array fields
    x.y.z...
    x.y.z[i]...
    GET /foo?a.b=bar
    GET /foo?x.y_lt=100
    GET /foo?arr[0]=bar
    Embed
    GET /posts?_embed=comments
    GET /comments?_embed=post

    Delete
    DELETE /posts/1
    DELETE /posts/1?_dependent=comments
    ```

6.  Serving static files

    ```
    json-server -s ./static
    json-server -s ./static -s ./node_modules
    ```

7.  If wants port change

    ```
    package.json
        "scripts:{
            "server-json":"json-server --watch db.json --port 4000"
        }
    ```

8.  Custom Routes

    ```
    routes.json
        {
            "/api/v1/*" : "/$1"
            "/products/:category*" : "/products?category=category"
        }

    package.json
        {
            "server-json":"json-server --watch db.json --port 4000 --routes routes.json"
        }
    ```

9.  Generate Random Data

    ```
    package.json
        {
            "server-json":"json-server --watch data.js --port 4000 --routes routes.json"
        }
    OR
        https://github.com/faker-js/faker
        https://github.com/boolean/casual
        https://github.com/chancejs/chancejs

    ```
