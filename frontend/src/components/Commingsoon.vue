<template>
    <div class="eleven">
        <h1>Samie planner</h1>
    </div>
    <div class="image-container">
        <img src="../assets/uploads/commingsoon.jpg" alt="">
    </div>
</template>

<style scoped>
.image-container {
    position: relative;
    /* Để có thể định vị văn bản trên hình ảnh */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    /* Đặt chiều cao để hình ảnh nằm giữa trên mọi thiết bị */
}
*{
    background-color: #143D38;
}
img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
}

/* === BASE HEADING === */

h1 {
    position: relative;
    padding: 0;
    margin: 0;
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 6vw; /* Chỉnh kích thước chữ theo đơn vị vw */
    color: #ffffff; /* Đổi màu chữ thành trắng */
    background-color: #143D38; /* Đổi màu nền thành xanh #143D38 */
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
    padding: 10px 20px; /* Thêm padding để chữ trở nên rõ ràng hơn */
    border-radius: 5px; /* Tạo viền cong cho chữ */
}

.eleven h1 {
    font-size: 8vw; /* Chỉnh kích thước chữ theo đơn vị vw */
    text-align: center;
    line-height: 1.5em;
    padding-bottom: 3vh; /* Đặt khoảng cách dưới cho chữ theo đơn vị vh */
    font-family: "Playfair Display", serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ffffff; /* Đổi màu chữ thành trắng */
    background-color: #143D38; /* Đổi màu nền thành xanh #143D38 */
}

.eleven h1:before {
    position: absolute;
    left: 0;
    bottom: 1vh; /* Đặt khoảng cách dưới cho dấu gạch dưới theo đơn vị vh */
    width: 60%;
    left: 50%;
    margin-left: -30%;
    height: 1px;
    content: "";
    background-color: #ffffff; /* Đổi màu dấu gạch dưới thành trắng */
    z-index: 4;
}

.eleven h1:after {
    position: absolute;
    width: 4vw; /* Chỉnh kích thước của dấu gạch dưới theo đơn vị vw */
    height: 4vw; /* Chỉnh kích thước của dấu gạch dưới theo đơn vị vw */
    left: 50%;
    margin-left: -2vw; /* Đặt khoảng cách ngang cho dấu gạch dưới theo đơn vị vw */
    bottom: 0.5vh; /* Đặt khoảng cách dưới cho dấu gạch dưới theo đơn vị vh */
    content: '\00a7';
    font-size: 3.5vw; /* Chỉnh kích thước của dấu gạch dưới theo đơn vị vw */
    line-height: 4vw; /* Chỉnh kích thước của dấu gạch dưới theo đơn vị vw */
    color: #ffffff;
    font-weight: 400;
    z-index: 5;
    display: block;
    background-color: #143D38; /* Đổi màu nền của dấu gạch dưới thành xanh #143D38 */
}
</style>
