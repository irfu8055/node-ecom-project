$(function () {
    // console.log("Test jquery file");

    //registration form
    $(".btn-register").click(function () {
        // console.log("Register Button Working");
        var formRec = $("#register_form").serialize();
        // console.log(formRec);
        //userName=a&userMobile=b&userEmail=c&userPassword=d&userCpass=r
        $.post("/register-action", formRec, function (responseFromNodejs) {
            console.log("response From Nodejs");
            console.log(responseFromNodejs);
            $(".register_err_msg").html(responseFromNodejs['msg'])
        });
    });
    //registration form

    //login form
    $(".btn-login").click(function () {
        // console.log("login btn click wrkign");
        var rec = $("#login_form").serialize();
        // console.log(rec);

        $.post("/login-action", rec, function (response) {
            console.log("Response From Login Action Route");
            console.log(response);

            $(".login_err_msg").html(response['msg']);
        });
    });
    //login form

    // category Form
    $(".btn-category").click(function () {
        var dataFromForm = $("#category_form").serialize();
        // console.log(dataFromForm);

        $.post("/admin/category-action", dataFromForm, function (responseFromNodejs) {
            console.log(responseFromNodejs)
            $(".category_err_msg").html(responseFromNodejs['msg'])
        })
    })
    // category Form

    //brand form
    $(".btn-brand").click(function () {
        // alert()
        var dataFromTextBox = $("#brContent").val();
        // alert(dataFromTextBox)

        var obj = { brName: dataFromTextBox };
        // console.log(obj);

        $.post("/admin/brand-action", obj, function (res) {
            console.log("Res From Node Js");
            console.log(res);
            $(".err_brand").html(res['msg'])
        })

    })
    //brand form

    //category filter code
    $(".catRecord").click(function (obj) {
        obj.preventDefault();
        //prevent default behaviour of anchor tag
        // alert()
        //<a href="#" for="<%= obj._id%>" class='catRecord'>
        var ans = $(this).attr("for");
        // console.log(ans);

        var rec = { catId: ans };
        // console.log(rec);

        $.post("/filter-product-category", rec, function (res) {
            // console.log("response from Node");
            console.log(res);
            var answer = res['msg'];
            console.log(answer);

            // $(".features_items").html("No Data")

            if (answer.length > 0) {

                content = `<h2> Products By Category </h2>`;

                answer.forEach(function (val) {
                    // console.log(val);
                    console.log(val.productName);
                    console.log(val.productPrice);
                    console.log(val.productImagePath);

                    content = content + `
                        <div class='col-md-4 text-center'>
                            <img src='/public/products/${val.productImagePath}' class='img-responsive' />
                            <h2>${val.productPrice}</h2>
                            <p>${val.productName}</p>
                            <p>
                                <button class='btn btn-warning'>Add To Cart </button>
                            </p>
                        </div>
                    `;
                });
                // console.log(content);
                $(".features_items").html(content)
            }
            else {
                $(".features_items").html("No Data")
            }
        });
    });

    //brand filter process
    $(".brand_data").click(function (obj) {
        obj.preventDefault();
        var ans = $(this).attr("for");
        // console.log(ans);
        $.post("/filter-product-brand", { brid: ans }, function (res) {
            // console.log("res from node js");
            // console.log(res);
            // console.log(res['msg']);

            if (res['msg'].length > 0) {
                content = ``;
                res['msg'].forEach(function (val) {
                    // console.log(val);
                    content = content + `
                    <div class='col-md-4 text-center'>
                        <img src='/public/products/${val.productImagePath}' class='img-responsive' />
                        <h2>${val.productPrice}</h2>
                        <p>${val.productName}</p>
                        <p>
                            <button class='btn btn-warning'>Add To Cart </button>
                        </p>
                    </div>
                    `
                })
                console.log(content);
                $(".features_items").html(content)
            }
            else {
                $(".features_items").html("No Record Found")
            }
        })
    })
    //brand filter process


    //add to cart
    $(".add-to-cart").click(function (obj) {
        obj.preventDefault();
        // alert("test")
        var result = $(this).attr("for");
        // console.log(result);

        $.post("/cart-action", { productid: result }, function (res) {
            console.log("res fromcart-action route");
            console.log(res);
            alert(res['msg'])
        });
    })
    //add to cart

    ///delete record from cart 
    $(".cart_quantity_delete").click(function (obj) {
        obj.preventDefault();
        if (confirm("Delete ??")) {
            var cura = $(this);
            
            var proid = $(this).attr("for");
            // console.log(proid)
            $.post("/delete-cart-action", { productValue: proid }, function (res) {
                // console.log("response from action route");
                // console.log(res);
                // a.td.tr.remove();
                cura.parent().parent().fadeOut(1000);
            })
        }
    });

    ///
    $('.qunatity_class').change(function(){
        var curText = $(this).val();
        console.log(curText)
        console.log($(this).parent())
        // console.log($(this).parent().prev().text())
        var discounted_price=$(this).parent().prev().text();

        var finalPrice_after_quantity = curText * discounted_price;
        console.log(finalPrice_after_quantity)

        $(this).parent().next().text(finalPrice_after_quantity);
        
    })

    ///
});




