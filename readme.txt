Topics :
---------------
registration
Login
add to cart
checkout
payment & mail

Add To cart --
-----------------------------------------------------------
cookie - 

1) name
2) record
3) expire time

even if browser is closed, u can access cookies data , domainwise

cookie data can be deleted 
    1) expire time expires
    2) browser if you remove manually
    3) by program


a) npm i cookie-parser

b) var cookieParser = require('cookie-parser')
app.use(cookieParser())

c) on add to cart click store product id in cookies

d) store many product id cookies

allProduct = 10,12,80,90,70