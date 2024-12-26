#!/bin/bash

# Base URL for the requests
URL="https://myhost/"

# Example 1: Basic GET request
# curl -X GET "$URL"

# Example 2: GET request with custom headers
# curl -X GET "$URL" -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json"

# Example 3: HEAD request
# curl -I "$URL"

# Example 4: POST request with JSON data
# curl -X POST "$URL" -H "Content-Type: application/json" -d '{"key":"value"}'

# Example 5: GET request with a custom Host header
# curl -X GET "$URL" -H "Host: mycustomhost.com"

# Example 6: POST request with form data
# curl -X POST "$URL" -d "field1=value1&field2=value2"

# Example 7: PUT request with JSON data
# curl -X PUT "$URL/resource" -H "Content-Type: application/json" -d '{"key":"updatedValue"}'

# Example 8: DELETE request
# curl -X DELETE "$URL/resource"

# Example 9: GET request with query parameters
# curl -X GET "$URL?param1=value1&param2=value2"

# Example 10: GET request with verbose output
# curl -X GET "$URL" -v

# Example 11: Downloading a file with a GET request
# curl -O "$URL/path/to/file"

# Example 12: Sending a file with a POST request
# curl -X POST "$URL/upload" -H "Content-Type: multipart/form-data" -F "file=@path/to/local/file"

# Example 13: Limiting request time with a timeout
# curl -X GET "$URL" --max-time 10

# Example 14: Following redirects
# curl -X GET "$URL" -L

# Example 15: GET request with cookies
# curl -X GET "$URL" -b "cookieName=cookieValue"

# Example 16: Saving response headers to a file
# curl -X GET "$URL" -D headers.txt

# Example 17: Sending a PATCH request
# curl -X PATCH "$URL/resource" -H "Content-Type: application/json" -d '{"key":"patchedValue"}'

# Example 18: Basic authentication
# curl -X GET "$URL" -u username:password

# Example 19: Simulating a browser user-agent
# curl -X GET "$URL" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"

# Example 20: Sending multiple headers
# curl -X GET "$URL" -H "Header1: Value1" -H "Header2: Value2"

# Example 21: Capturing response body to a file
# curl -X GET "$URL" -o response.txt

# Example 22: POST request with URL-encoded data
# curl -X POST "$URL" -H "Content-Type: application/x-www-form-urlencoded" -d "key1=value1&key2=value2"

# Example 23: GET request with HTTP/2
# curl -X GET "$URL" --http2

# Example 24: Ignoring SSL certificate validation
# curl -X GET "$URL" -k

# Example 25: Uploading a file using PUT
# curl -X PUT "$URL/path/to/resource" --upload-file path/to/local/file
