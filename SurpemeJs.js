// Photo Name of item
var target = 'ttViJFtqaxc'
// Put in Billing and Shipping info
var credit_card_last_name = '姓'
var credit_card_first_name = '名'
var order_email = 'test@yahoo.co.jp'
var order_tel = '000000000'
var order_billing_state = ' 東京都'
var order_billing_city = 'aaaaaaaaaaaaaaaaa'
var order_billing_address = 'ddddddddddddddd'
var order_billing_zip = '0000000'
var credit_card_type = 'american_express' // visa american_express master jcb cod
var cnb = '0000 1111 2222 3333 4444'
var credit_card_month = '11' // 01 02 03 04 05 06 07 08 09 10 11 12
var credit_card_year = '2022' // 2018 ~ 2018 ten years
var vval = '111'
var auto_chenckout = '1'; // '0':no auto '1':auto

// Your size
var preferredSize = "Medium"; // "Small", "Medium", "Large", "XLarge"

$('#container article div img').each(function() {
    var href = $(this).attr('src');
    //console.log(href.match(target));
    if (href.match(target)) {
      $(this)[0].click();
    }
});

/*
automatically choose correct size, if applicable
*/
(function waitTillArticlePageIsOpen() {
  // check if article page has loaded by looking at main image
  if ($("#img-main")[0]) {
    // choose appropriate size, if applicable
    if ($("select")[0]) {
      for (var i = 0; i < $("select")[0].options.length; i++) {
        if ($("select")[0].options[i].text == preferredSize) {
          $("select")[0].selectedIndex = i;
          break;
        }
      }
    }
    console.log("done choosing size.")
    addToCart()
    payment()
  } else 
    setTimeout(function(){ waitTillArticlePageIsOpen(); }, 10);
    console.log("waiting to load...");
  
  return;
})();

function addToCart() {
  /*
  Script to use on item screen
  */
  // add to cart
  document.getElementsByName('commit')[0].click();

  // Wait until cart updates, then go to checkout
  var itemsCountElm = $("#items-count");

  (function waitTillCartUpdates() {
    if (itemsCountElm.text() == '') {
      setTimeout(function(){ waitTillCartUpdates(); }, 10);
      return;
    } else {
      // Click checkout button
      $(".checkout")[0].click();
      return;
    }
  })();
}

function payment() {
    if (document.getElementById('checkout_form')) {
      /*
      Script to use on checkout screen
      */
      if ($('input#credit_card_last_name')) {
        $('input#credit_card_last_name').attr('value', credit_card_last_name);
      }
      if ($('input#credit_card_first_name')) {
        $('input#credit_card_first_name').attr('value', credit_card_first_name);
      }
      if ($('input#order_email')) {
        $('input#order_email').attr('value', order_email);
      }
      if ($('input#order_tel')) {
        $('input#order_tel').attr('value', order_tel);
      }
      if ($('#order_billing_state option[value=' + '"' + order_billing_state + '"]')) {
        $('#order_billing_state option[value=' + '"' + order_billing_state + '"]').attr("selected", "selected");
      }
      if ($('input#order_billing_city')) {
        $('input#order_billing_city').attr('value', order_billing_city);
      }
      if ($('input#order_billing_address')) {
        $('input#order_billing_address').attr('value', order_billing_address);
      }
      if ($('input#order_billing_zip')) {
        $('input#order_billing_zip').attr('value', order_billing_zip);
      }

      // Put in CC info
      if ($('select#credit_card_type')) {
        $('select#credit_card_type').val(credit_card_type);
        $('select#credit_card_type').focusout();
      }
      if (credit_card_type != 'cod') {
        if ($('input#cnb')) {
          $('input#cnb').attr('value', cnb);
        }
        if ($('select#credit_card_month')) {
          $('select#credit_card_month').val(credit_card_month);$('select#credit_card_year').val(credit_card_year);
        }
        if ($('input#vval')) {
          $('input#vval').attr('value', vval);
        }
      } else {
        $('#card_details').css('display', 'none');
      }
      // Check the "I Accept Terms..." button
      if ($('input#order_terms')) {
        $('input#order_terms').attr("checked",true);
      }
      commitPayment();
    } else 
      setTimeout(function(){ payment(); }, 10);
      console.log("waiting to payment...");
  
    return;
}

/////////////// 自动结账!!! 移除下面第二行前两个斜杠即可开启///////////////////
function commitPayment() {
  if (auto_chenckout == '1') {
    document.getElementsByName('commit')[0].click();
  }
}
