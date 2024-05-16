<template>

    <body
        class="body1 page-template-default page page-id-4104 wp-custom-logo stk--is-helloelementor-theme elementor-default elementor-kit-682 elementor-page elementor-page-4104">
        <header1 />
        <div class="wrap-main w-clear" v-if="serviceDetail">
            <div class="wrap-content">
                <h1 class="title-main"><span>{{ serviceDetail.tendichvu }}</span></h1>
                <div class="time-main"><i class="fas fa-calendar-week"></i><span>Ngày đăng: {{ new
                    Date(serviceDetail.createdAt).toLocaleDateString('en-GB') }}</span></div>
                <div class="content-main baonoidung w-clear">
                    <p v-for="image in serviceDetail.hinhanhchitietdichvu" :key="image.id">
                        <img :src="image.duongDan" :alt="serviceDetail.tendichvu" height="3423" width="5433" />
                    </p>
                </div>
                <!-- Additional shared content if needed -->
            </div>
        </div>
        <footer1 />
    </body>
    <toast ref="toast"></toast>

</template>
<script>
import toast from '../components/toast.vue';
import header1 from '../components/header.vue';
import footer1 from '../components/footer.vue';
export default
    {
        data() {
            return {
                service: null,
                serviceDetail: null,
            };
        },
        components:
        {
            header1,
            footer1
        },
        async created() {
            await this.getService();
        },
        methods: {
            async getService() {
                try {
                    const path = this.$route.params.duong_dan_service; // Getting URL parameter
                    const response = await this.$axios.get('getService');
                    this.serviceDetail = response.data.find(service => service.duongdanchitiet === path);
                    console.log(this.serviceDetail)
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                    this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
                }
            },
        },
    }
</script>
<style scoped>
.body1 {
    font-size: 14px;
    font-weight: 400;
    top: 0 !important;
    background: #FDF6F0;
    font-family: 'Quicksand', sans-serif;
}
</style>