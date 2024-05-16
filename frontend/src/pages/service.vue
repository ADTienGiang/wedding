<template>
    <div id="full">
        <header1 />

        <div class="wrap-main  w-clear">
            <div class="banner">
                <img :src="this.banner1" />
                <h1 class="title-service">Our Services</h1>
            </div>
            <div class="wrap-info-service wrap-content">
                <div class="title-main-ser"><span>{{ tieude }}</span></div>
                <div class="desc_info_ser">
                    {{ gioithieu }} </div>
            </div>
            <div class="content-main wrap-content w-clear">
                <div class="row row2">
                    <!-- Vòng lặp để hiển thị từng dịch vụ -->
                    <div v-for="item in service" :key="item.id" class="item2 col-6 col-lg-6 col-md-6 col-sm-6 mb-3">
                        <div class="item_ser w-clear animate__animated animate__zoomIn wow">
                            <!-- Link đến chi tiết của dịch vụ -->
                            <router-link class="pic-ser scale-img" :to="'/service-detail/' + item.duongdanchitiet"
                                :title="item.tendichvu">
                                <img :src="item.banner" :alt="item.tendichvu">
                            </router-link>
                            <div class="info-ser">
                                <h3>
                                    <router-link class="name-ser text-decoration-none text-split"
                                        :to="'/service-detail/' + item.duongdanchitiet" :title="item.tendichvu">{{
                                        item.tendichvu }}</router-link>
                                </h3>
                                <div class="desc-ser">
                                    <p><span style="line-height:1;">{{ item.mota }}</span></p>
                                    <p><span style="line-height:1;">Các gói Planning:</span></p>
                                    <p><span style="line-height:1;"><strong>
                                                <!-- Dùng v-for trực tiếp trong thẻ p với các dòng mới qua <br> -->
                                                <span v-for="(package1, index) in item.cacgoidichvu" :key="package1.id">
                                                    {{ package1.tengoidichvu }}<br
                                                        v-if="index < item.cacgoidichvu.length - 1">
                                                </span>
                                            </strong></span></p>
                                </div>
                                <router-link class="views_a text-decoration-none"
                                    :to="'/service-detail/' + item.duongdanchitiet" :title="item.tendichvu">Xem chi
                                    tiết</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="pagination-home"></div>
            </div>
            <div class="wrap-lh lh1">
                <div class="info_contact animate__animated animate__zoomIn wow">
                    <div class="tt-contact">let us</div>
                    <div class="slogan-contact">Accompany you in the wedding</div>
                    <router-link class="views_lh" :to="'/lien-he'" title="Wedding Planner">Liên hệ để được tư vấn<i class='bx bx-phone-call' ></i></router-link>
                </div>
            </div>
        </div>
        <footer1 />
    </div>
</template>

<script>
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
export default
    {
        data() {
            return {
                service: [],
                idservice: '',
                banner1: '',
                tieude: '',
                gioithieu: '',
            };
        },
        components:
        {
            header1,
            footer1
        },
        async created() {
            await this.getService();
            await this.getBannerContentService();
        },
        methods: {

            async getService() {
                try {
                    const response = await this.$axios.get('getService');
                    this.service = response.data;
                    console.log(this.service)
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                    this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
                }
            },
            async getBannerContentService() {
                try {
                    const response = await this.$axios.get('getBannerContentService');
                    this.banner1 = response.data[0].banner;
                    this.tieude = response.data[0].tieude;
                    this.gioithieu = response.data[0].gioithieu;
                    console.log(response.data)
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                    this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
                }
            },

        },
    }
</script>
<style scoped>
.views_a {
    width: 140px;
    height: 42px;
    line-height: 42px;
    background: #E2CDBC;
    color: #13304a;
    display: block;
    font-size: 15px;
    transition: 0.5s;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 10px;
}
</style>