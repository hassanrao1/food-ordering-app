(this.webpackJsonpsweet=this.webpackJsonpsweet||[]).push([[0],{135:function(e,t){},136:function(e,t){},143:function(e,t){},145:function(e,t){},183:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),a=c(26),o=c.n(a),s=(c(52),c(87),c(5)),l=c(10),i=c(8),d=c(13),j=c(7),u=c.n(j),h=c(0),b=Object(n.createContext)(),O=Object(n.createContext)(),x=function(){return Object(n.useContext)(b)},m=function(){return Object(n.useContext)(O)},p=function(e){var t=e.children,c=Object(n.useState)({user:null,isLoggedIn:!1,cart:[],totalAmount:0,role:null,allOrders:[],userOrders:[],products:[]}),r=Object(d.a)(c,2),a=r[0],o=r[1];return Object(n.useEffect)((function(){return u()({method:"get",url:"".concat("https://food-mania.herokuapp.com","/profile")}).then((function(e){console.log("context response",e.data.userData),200===e.data.status&&o((function(t){return Object(s.a)(Object(s.a)({},t),{},{user:e.data.userData,isLoggedIn:!0,role:e.data.userData.role})}))})).catch((function(e){console.log(e),e&&o((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoggedIn:!1})}))})),function(){console.log("cleanup")}}),[]),Object(h.jsx)("div",{children:Object(h.jsx)(b.Provider,{value:a,children:Object(h.jsx)(O.Provider,{value:o,children:t})})})},f=(c(61),c(29)),g=c(188),v=c(189),y=function(e){var t=e.name,c=e.amount,r=e.image,a=e.quantity,o=e.id,l=e.actualPrice,i=e.halfKg,j=e.totalAmount,u=e.inCart,b=x(),O=m(),p=Object(n.useState)(u),y=Object(d.a)(p,2),N=y[0],C=y[1],I=Object(n.useState)("Add to cart"),k=Object(d.a)(I,2),S=k[0],A=k[1];return Object(h.jsxs)(g.a,{style:{width:"18rem"},className:"foodCard text-center",children:[Object(h.jsx)(g.a.Img,{variant:"top",src:r,height:"150px"}),Object(h.jsxs)(g.a.Body,{children:[Object(h.jsx)(g.a.Title,{children:t}),Object(h.jsxs)(g.a.Text,{children:[l,"rs"]}),Object(h.jsx)(g.a.Text,{children:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus et iste suscipit officiis tempora ad ea, voluptate totam labore laudantium ex eum quidem asperiores unde similique numquam eligendi maiores dolorum."}),Object(h.jsx)(v.a,{variant:"primary",disabled:N,onClick:function(){var e={name:t,amount:c,quantity:a,id:o,actualPrice:l,halfKg:i,inCart:u};C(!0),A("Added to your cart"),O((function(t){return Object(s.a)(Object(s.a)({},t),{},{cart:[].concat(Object(f.a)(b.cart),[e]),totalAmount:j})}))},children:S})]})]})},N=function(){var e=x(),t=m();Object(n.useEffect)((function(){u()({method:"get",url:"".concat("https://food-mania.herokuapp.com","/Products")}).then((function(e){console.log(e.data.products),t((function(t){return Object(s.a)(Object(s.a)({},t),{},{products:e.data.products})}))})).catch((function(e){return console.log(e)}))}),[]);var c=e.products.reduce((function(e,t){return{amount:e.amount+t.amount}}),0);return console.log(e),Object(h.jsxs)("div",{children:[e.user&&Object(h.jsxs)("h1",{className:"text-center",children:["Welcome ",e.user.name," "]}),Object(h.jsx)("div",{className:"foodContainer",children:e.products.map((function(e,t){return Object(h.jsx)(y,{actualPrice:e.actualPrice,name:e.foodName,amount:e.amount,quantity:e.quantity,image:e.image,id:e._id,halfKg:e.halfKg,inCart:e.inCart,totalAmount:c.amount},t)}))})]})},C=c(18),I=c(187),k=c(79),S=c.n(k);c(106);u.a.defaults.withCredentials=!0;var A=function(){var e,t="https://food-mania.herokuapp.com",c=Object(i.g)(),r=(x(),m()),a=Object(n.useRef)();console.log(a);var o=Object(n.useRef)(),l=Object(n.useState)(""),j=Object(d.a)(l,2),b=j[0],O=j[1];Object(n.useEffect)((function(){console.log(b),u()({method:"post",url:"".concat(t,"/auth/validateEmail"),data:{email:b}}).then((function(e){console.log("validation",e.data.isFound),console.log("validation",e.data.data),null===e.data.data?(document.getElementById("validate").innerText="email not found",a.current.style.border="1px solid red"):e.data.data&&(a.current.style.border="1px solid green",document.getElementById("validate").innerText="")})).catch((function(e){return e}))}),[b]);return Object(h.jsx)("div",{className:"text-center",children:Object(h.jsxs)(g.a,{style:{width:"20rem",margin:"0 auto"},className:"p-4 mt-4",children:[Object(h.jsx)("h1",{children:"Login"}),Object(h.jsxs)(g.a.Body,{children:[Object(h.jsxs)(I.a,{onSubmit:function(e){e.preventDefault(),u()({method:"post",url:t+"/auth/login",data:{email:a.current.value,password:o.current.value}}).then((function(e){console.log("response",e),alert(e.data.message),200===e.data.status&&(c.push("/dashboard"),r((function(t){return Object(s.a)(Object(s.a)({},t),{},{isLoggedIn:!t.isLoggedIn,role:e.data.user.role})})))}),(function(e){alert("error",e),console.log("error data",JSON.stringify(e.message))}))},children:[Object(h.jsxs)(I.a.Group,{controlId:"formBasicEmail",children:[Object(h.jsx)(I.a.Control,(e={type:"email",placeholder:"Enter email"},Object(C.a)(e,"type","email"),Object(C.a)(e,"ref",a),Object(C.a)(e,"required",!0),Object(C.a)(e,"onChange",(function(e){return O(e.target.value)})),e)),Object(h.jsx)(I.a.Text,Object(C.a)({className:"text-muted",id:"validate"},"className","float-right"))]}),Object(h.jsx)(I.a.Group,{controlId:"formBasicPassword",children:Object(h.jsx)(I.a.Control,{type:"password",placeholder:"Password",ref:o,required:!0})}),Object(h.jsx)(v.a,{variant:"primary",type:"submit",block:!0,children:"Login"})]}),Object(h.jsx)("div",{style:{margin:"10px"},children:Object(h.jsx)(S.a,{clientId:"365725440376-0kid8u1c752gledmh2u1o095abcnc1ev.apps.googleusercontent.com",buttonText:"Login With Google",onSuccess:function(e){console.log(e),u()({method:"post",url:"".concat(t,"/auth/googleLogin"),data:{tokenId:e.tokenId},withCredentials:!0}).then((function(t){console.log(t),alert(t.data.message),window.location.reload(),200===e.data.status&&(c.push("/"),r((function(t){return Object(s.a)(Object(s.a)({},t),{},{isLoggedIn:!t.isLoggedIn,role:e.data.user.role})})))})).catch((function(e){return console.log(e)}))},onFailure:function(e){console.log(e)},cookiePolicy:"single_host_origin"})})]})]})})},q=function(){var e="https://food-mania.herokuapp.com",t=Object(i.g)(),c=Object(n.useRef)(),r=Object(n.useRef)();console.log(r);var a=Object(n.useRef)(),o=Object(n.useState)(""),s=Object(d.a)(o,2),l=s[0],j=s[1];return Object(n.useEffect)((function(){console.log(l),u()({method:"post",url:"".concat(e,"/auth/validateEmail"),data:{email:l}}).then((function(e){console.log("validation",e.data.isFound),console.log("validation",e.data.data),null===e.data.data?(document.getElementById("validate").innerText="",r.current.style.border="1px solid green"):e.data.data&&(r.current.style.border="1px solid red",document.getElementById("validate").innerText="email already registered")}))}),[l]),Object(h.jsx)("div",{className:"text-center",children:Object(h.jsxs)(g.a,{style:{width:"20rem",margin:"0 auto"},className:"p-4 mt-4",children:[Object(h.jsx)("h1",{children:"Sign Up"}),Object(h.jsx)(g.a.Body,{children:Object(h.jsxs)(I.a,{onSubmit:function(n){n.preventDefault(),u()({method:"post",url:e+"/auth/signup",data:{name:c.current.value,email:r.current.value,password:a.current.value}}).then((function(e){console.log("response",e),console.log("response doc",e.data.doc),alert(e.data.message),200===e.data.status&&t.push("/login")}),(function(e){alert("error",e),console.log("error data",e.response)}))},children:[Object(h.jsx)(I.a.Group,{children:Object(h.jsx)(I.a.Control,{type:"text",placeholder:"Normal text",ref:c,required:!0})}),Object(h.jsxs)(I.a.Group,{controlId:"formBasicEmail",children:[Object(h.jsx)(I.a.Control,{type:"email",placeholder:"Enter email",ref:r,required:!0,onChange:function(e){return j(e.target.value)}}),Object(h.jsx)(I.a.Text,Object(C.a)({className:"text-muted",id:"validate"},"className","float-right"))]}),Object(h.jsx)(I.a.Group,{controlId:"formBasicPassword",children:Object(h.jsx)(I.a.Control,{type:"password",placeholder:"Password",ref:a,required:!0})}),Object(h.jsx)(v.a,{variant:"primary",type:"submit",block:!0,children:"Submit"})]})})]})})},P=function(){return Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"Welcome to Food Mania"})})},w=c(185),T=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),c=Object(n.useRef)(),r=x(),a=m(),o=Object(n.useState)(!1),l=Object(d.a)(o,2);l[0],l[1];return console.log(r.products),Object(h.jsxs)("div",{className:"d-flex flex-column p-3 ",children:[Object(h.jsx)("h3",{className:"text-center",children:"Order Information"}),Object(h.jsxs)(w.a,{striped:!0,bordered:!0,hover:!0,size:"sm",className:"text-center",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Item Name"}),Object(h.jsx)("th",{children:"Price"}),Object(h.jsx)("th",{children:"Quantity"}),Object(h.jsx)("th",{children:"Amount"}),Object(h.jsx)("th",{children:"Remove"})]})}),Object(h.jsx)("tbody",{children:r.cart.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.actualPrice}),Object(h.jsxs)("td",{children:[Object(h.jsx)(v.a,{variant:"outline-info",disabled:e.lessThanZero,onClick:function(){return function(e,t){r.cart.map((function(c,n,o){if(c.name===o[t].name){var l=Object(f.a)(r.cart);l[t].quantity-=1,l[t].amount=l[t].actualPrice*l[t].quantity;var i=l.reduce((function(e,t){return{amount:e.amount+t.amount}}));a((function(e){return Object(s.a)(Object(s.a)({},e),{},{cart:l,totalAmount:i.amount})})),console.log("product price is=>",c),console.log("our product name",r.cart[t].name),console.log("new cart",r.cart),console.log("total amount",r.totalAmount),console.log("remove event",e)}console.log("new value",o[t].quantity),o[t].quantity<=1&&(o[t].lessThanZero=!0)}))}(e,t)},children:"-"})," ",e.quantity," ",Object(h.jsx)(v.a,{variant:"outline-info",onClick:function(){return function(e){r.cart.map((function(t,c,n){if(t.name===n[e].name){var o=Object(f.a)(r.cart);o[e].quantity+=1,o[e].amount=o[e].actualPrice*o[e].quantity;var l=o.reduce((function(e,t){return{amount:e.amount+t.amount}}));a((function(e){return Object(s.a)(Object(s.a)({},e),{},{cart:o,totalAmount:l.amount})}))}n[e].quantity>=1&&(n[e].lessThanZero=!1)}))}(t)},children:"+"})]}),Object(h.jsxs)("td",{children:[e.amount,"rs"]}),Object(h.jsx)("td",{children:Object(h.jsx)("button",{onClick:function(){return function(e,t){console.log("running",e,t);var c=r.cart.reduce((function(e,t){return{amount:e.amount+t.amount}})),n=r.cart.filter((function(t){return t.id!==e})),o=c.amount-t;a((function(e){return Object(s.a)(Object(s.a)({},e),{},{cart:n,totalAmount:o})})),console.log(r.cart)}(e.id,e.amount)},children:"Delete"})})]},t)}))})]}),Object(h.jsx)("div",{className:"d-flex justify-content-end",children:Object(h.jsx)(g.a,{style:{width:"18rem"},children:Object(h.jsxs)(g.a.Body,{children:[Object(h.jsx)(g.a.Title,{className:"text-left",children:"Order Details"}),Object(h.jsxs)(g.a.Text,{as:"h6",children:["Total Amount: ",r.totalAmount,"rs",Object(h.jsxs)(I.a,{className:"pt-2",onSubmit:function(n){n.preventDefault(),u()({method:"post",url:"".concat("https://food-mania.herokuapp.com","/placeorder"),data:{order:r.cart,total:r.totalAmount,address:e.current.value,phone:t.current.value,remarks:c.current.value}}).then((function(n){alert(n.data.message),console.log(n.data.message),console.log(n.data.data),a((function(e){return Object(s.a)(Object(s.a)({},e),{},{cart:[]})})),e.current.value="",t.current.value="",c.current.value=""})).catch((function(e){return console.log(e)}))},children:[Object(h.jsx)(I.a.Group,{controlId:"formBasicEmail",children:Object(h.jsx)(I.a.Control,{type:"text",ref:e,placeholder:"Your Address",required:!0})}),Object(h.jsx)(I.a.Group,{controlId:"formBasicEmail",children:Object(h.jsx)(I.a.Control,{type:"text",ref:t,placeholder:"Your Phone Number",required:!0})}),Object(h.jsx)(I.a.Group,{controlId:"exampleForm.ControlTextarea1",children:Object(h.jsx)(I.a.Control,{as:"textarea",ref:c,rows:3,placeholder:"Remarks Or any additional Note",required:!0})}),Object(h.jsx)(v.a,{variant:"primary",type:"submit",children:"Place Order"})]})]})]})})})]})},E=c(186),L=function(){var e=Object(n.useState)(!1),t=Object(d.a)(e,2),c=t[0],r=t[1],a="https://food-mania.herokuapp.com",o=x(),l=m();Object(n.useEffect)((function(){u()({method:"get",url:"".concat(a,"/orders")}).then((function(e){console.log("order details",e),l((function(t){return Object(s.a)(Object(s.a)({},t),{},{allOrders:e.data.orders})}))})).catch((function(e){return console.log(e)}))}),[c]);console.log(o.allOrders);var i=o.allOrders.filter((function(e){return"pending"===e.status}));return console.log(i),Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"welcome to Dashboard"}),i.length>0?Object(h.jsx)("div",{className:"d-flex flex-column-reverse",children:i.map((function(e,t){var c=e.orderDetails,n=e.orderTotal,o=e.address,s=e.email,l=e.phone,i=e.remarks,d=e.name,j=e._id,b=e.status;return Object(h.jsx)(E.a,{children:Object(h.jsxs)(g.a,{children:[Object(h.jsx)(E.a.Toggle,{as:g.a.Header,eventKey:"0",style:{color:"red",cursor:"pointer"},children:"New Order"}),Object(h.jsx)(E.a.Collapse,{eventKey:"0",children:Object(h.jsxs)("div",{className:"p-4",children:[Object(h.jsx)("h4",{children:"Order Details"}),Object(h.jsxs)("div",{children:[Object(h.jsxs)(w.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{children:"Quantity"}),Object(h.jsx)("th",{children:"Actual Price"}),Object(h.jsx)("th",{children:"Amount"})]})}),Object(h.jsx)("tbody",{children:c.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.quantity}),Object(h.jsx)("td",{children:e.actualPrice}),Object(h.jsx)("td",{children:e.amount})]},t)}))}),Object(h.jsx)("h4",{children:"User Details"}),Object(h.jsxs)("tfoot",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Total Amount"}),Object(h.jsx)("td",{colSpan:"3",children:n})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Status"}),Object(h.jsx)("td",{colSpan:"3",children:b})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("td",{colSpan:"3",children:d})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Email"}),Object(h.jsx)("td",{colSpan:"3",children:s})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Address"}),Object(h.jsx)("td",{colSpan:"3",children:o})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Phone Number"}),Object(h.jsx)("td",{colSpan:"3",children:l})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Remarks"}),Object(h.jsx)("td",{colSpan:"3",children:i})]})]})]}),Object(h.jsx)(v.a,{className:"float-right",onClick:function(){return e=j,console.log(e),void u()({method:"patch",url:"".concat(a,"/acceptOrder"),data:{id:e}}).then((function(e){console.log(e),r(!0)}));var e},variant:"success",children:"Accept"})]})]})})]})},t)}))}):"No Orders"]})},D=function(){var e=x(),t=m();return Object(n.useEffect)((function(){u()({method:"get",url:"".concat("https://food-mania.herokuapp.com","/myorders")}).then((function(e){console.log(e.data.userOrders),t((function(t){return Object(s.a)(Object(s.a)({},t),{},{userOrders:e.data.userOrders})}))})).catch((function(e){return console.log(e)}))}),[]),console.log(e),Object(h.jsxs)("div",{className:"p-4",children:[Object(h.jsx)("h1",{className:"text-center",children:"Your orders"}),Object(h.jsx)("div",{className:"d-flex flex-column-reverse",children:e.userOrders.map((function(e,t){var c=e.orderDetails,n=e.orderTotal,r=e.remarks;e.address,e.phone;return console.log(r,n),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsxs)("h3",{children:["Order#",t]})}),Object(h.jsx)("div",{children:Object(h.jsxs)(w.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{children:"Quantity"}),Object(h.jsx)("th",{children:"Amount"})]})}),Object(h.jsx)("tbody",{children:c.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.quantity}),Object(h.jsx)("td",{children:e.amount})]},t)}))}),Object(h.jsx)("br",{}),Object(h.jsxs)("tfoot",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Total Amount"}),Object(h.jsx)("td",{colSpan:"2",children:n})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Remarks"}),Object(h.jsx)("td",{colSpan:"2",children:r})]})]})]})})]},t)}))})]})},B=function(){var e=Object(n.useRef)(),t=Object(n.useRef)();return Object(h.jsxs)("div",{className:"d-flex justify-content-center flex-column  align-items-center ",children:[Object(h.jsx)("h1",{children:"Add product"}),Object(h.jsxs)(I.a,{onSubmit:function(c){c.preventDefault(),function(){var c=document.getElementById("prodImg");console.log("fileInp",c),console.log("fileInp",c.files[0]);var n=new FormData;n.append("myFile",c.files[0]),n.append("productName",e.current.value),n.append("productAmount",t.current.value),u()({method:"post",url:"https://food-mania.herokuapp.com/upload",data:n,headers:{"Content-Type":"multipart/form-data"}}).then((function(c){alert(c.data.message),console.log("upload success",c.data),e.current.value="",t.current.value="",document.getElementById("prodImg").value=""})).catch((function(e){return console.log(e)}))}()},children:[Object(h.jsxs)(I.a.Group,{children:[Object(h.jsx)(I.a.Label,{children:"Product Name"}),Object(h.jsx)(I.a.Control,{type:"text",ref:e,placeholder:"Product Name",required:!0})]}),Object(h.jsxs)(I.a.Group,{children:[Object(h.jsx)(I.a.Label,{children:"Product Amount"}),Object(h.jsx)(I.a.Control,{type:"text",ref:t,placeholder:"Product Amount",required:!0})]}),Object(h.jsx)(I.a.Group,{children:Object(h.jsx)(I.a.File,{id:"prodImg",label:"Upload Image",required:!0})}),Object(h.jsx)(v.a,{variant:"primary",type:"submit",className:"w-100",children:"Add"})]})]})},R=function(){var e=x(),t=m();Object(n.useEffect)((function(){u()({method:"get",url:"".concat("https://food-mania.herokuapp.com","/orders")}).then((function(e){console.log("order details",e),t((function(t){return Object(s.a)(Object(s.a)({},t),{},{allOrders:e.data.orders})}))})).catch((function(e){return console.log(e)}))}),[]),console.log(e.allOrders);var c=e.allOrders.filter((function(e){return"accepted"===e.status}));return console.log(c),Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Recent Orders"}),Object(h.jsx)("div",{className:"d-flex flex-column-reverse",children:c.map((function(e,t){var c=e.orderDetails,n=e.orderTotal,r=e.address,a=e.email,o=e.phone,s=e.remarks,l=e.name,i=(e._id,e.status);return Object(h.jsx)(E.a,{children:Object(h.jsxs)(g.a,{children:[Object(h.jsxs)(E.a.Toggle,{as:g.a.Header,eventKey:"0",style:{color:"Gray",cursor:"pointer"},children:["Order#",t]}),Object(h.jsx)(E.a.Collapse,{eventKey:"0",children:Object(h.jsxs)("div",{className:"p-4",children:[Object(h.jsx)("h4",{children:"Order Details"}),Object(h.jsx)("div",{children:Object(h.jsxs)(w.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{children:"Quantity"}),Object(h.jsx)("th",{children:"Actual Price"}),Object(h.jsx)("th",{children:"Amount"})]})}),Object(h.jsx)("tbody",{children:c.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.quantity}),Object(h.jsx)("td",{children:e.actualPrice}),Object(h.jsx)("td",{children:e.amount})]},t)}))}),Object(h.jsx)("h4",{children:"User Details"}),Object(h.jsxs)("tfoot",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Total Amount"}),Object(h.jsx)("td",{colSpan:"3",children:n})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Status"}),Object(h.jsx)("td",{colSpan:"3",children:i})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("td",{colSpan:"3",children:l})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Email"}),Object(h.jsx)("td",{colSpan:"3",children:a})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Address"}),Object(h.jsx)("td",{colSpan:"3",children:r})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Phone Number"}),Object(h.jsx)("td",{colSpan:"3",children:o})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Remarks"}),Object(h.jsx)("td",{colSpan:"3",children:s})]})]})]})})]})})]})},t)}))})]})},G=function(){var e=x(),t=m(),c=function(){u()({method:"post",url:"".concat("https://food-mania.herokuapp.com","/auth/logout"),withCredentials:!0}).then((function(e){t((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoggedIn:!1})}))}))};return Object(h.jsxs)("div",{children:[e.isLoggedIn?null:Object(h.jsxs)(l.a,{children:[Object(h.jsx)("nav",{className:"navbar",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/",children:"Home"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/signup",children:"signup"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/login",children:"Login"})})]})}),Object(h.jsxs)(i.d,{children:[Object(h.jsx)(i.b,{exact:!0,path:"/",children:Object(h.jsx)(A,{})}),Object(h.jsx)(i.b,{path:"/signup",children:Object(h.jsx)(q,{})}),Object(h.jsx)(i.b,{path:"/login",children:Object(h.jsx)(A,{})}),Object(h.jsx)(i.b,{path:"*",children:Object(h.jsx)(i.a,{to:"/"})})]})]}),e.isLoggedIn&&"user"===e.role?Object(h.jsxs)(l.a,{children:[Object(h.jsx)("nav",{className:"navbar",bg:"light",variant:"light",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/",children:"Home"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/dashboard",children:"Dashboard"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/orders",children:"Your Orders"})}),Object(h.jsx)("li",{children:Object(h.jsxs)(l.b,{to:"/cart",children:[e.cart.length," Cart"]})}),Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:c,style:{border:"none",background:"none"},children:"Logout"})})]})}),Object(h.jsxs)(i.d,{children:[Object(h.jsx)(i.b,{exact:!0,path:"/",children:Object(h.jsx)(P,{})}),Object(h.jsx)(i.b,{path:"/dashboard",children:Object(h.jsx)(N,{})}),Object(h.jsx)(i.b,{path:"/orders",children:Object(h.jsx)(D,{})}),Object(h.jsx)(i.b,{path:"/cart",children:Object(h.jsx)(T,{})}),Object(h.jsx)(i.b,{path:"*",children:Object(h.jsx)(i.a,{to:"/"})})]})]}):null,e.isLoggedIn&&"admin"===e.role?Object(h.jsxs)(l.a,{children:[Object(h.jsx)("nav",{className:"navbar",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/admin",children:"Dashboard"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/recentOrders",children:"Recent Orders"})}),Object(h.jsx)("li",{children:Object(h.jsx)(l.b,{to:"/create",children:"Add Products"})}),Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:c,style:{border:"none",background:"none"},children:"Logout"})})]})}),Object(h.jsxs)(i.d,{children:[Object(h.jsx)(i.b,{path:"/admin",children:Object(h.jsx)(L,{})}),Object(h.jsx)(i.b,{path:"/recentOrders",children:Object(h.jsx)(R,{})}),Object(h.jsx)(i.b,{path:"/create",children:Object(h.jsx)(B,{})}),Object(h.jsx)(i.b,{path:"*",children:Object(h.jsx)(i.a,{to:"/admin"})})]})]}):null]})};var F=function(){return x(),m(),Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(G,{})})};c(182);o.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(p,{children:Object(h.jsx)(F,{})})}),document.getElementById("root"))},52:function(e,t,c){},61:function(e,t,c){},87:function(e,t,c){}},[[183,1,2]]]);
//# sourceMappingURL=main.787d3901.chunk.js.map