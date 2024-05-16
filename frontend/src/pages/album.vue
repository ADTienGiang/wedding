<template>
    <div id="full">
        <header1 />
        <div class="wrap-main  w-clear body1">
            <div class="content-main w-clear">
                <div class="wrap-list">
                    <div class="wrap-content">
                        <div class="cap1 d-flex flex-wrap justify-content-center">
                            <a data-list="8" data-type="album"
                                class="clicksp transition text-decoration-none"><span>ALL</span></a>
                            <a v-for="c in category" data-list="0"
                                class="clicksp transition text-decoration-none active"
                                data-type="album"><span>{{ c.tentheloai }}</span></a>
                        </div>
                        <div class="paging-product-category" >
                            <div class="row row1">
                                <div class="item1 col-12 col-lg-4 col-md-4 col-sm-12 animate__ animate__fadeIn wow animated"
                                    data-wow-delay="0s"
                                    style="visibility: visible; animation-delay: 0s; animation-name: fadeIn;" v-for="a in album" :key="a.id">
                                    <div class="product text-center">
                                        <router-link class="pic-product hover_circle" :to="{ name: 'detail-album', params: { duongdanhanhtrinh: a.duongdanhanhtrinh } }" title="EPIPHANY">
                                            <img :src="a.banner" alt="EPIPHANY">
                                        </router-link>
                                        <h3 class="name-product">
                                            <router-link class="text-split text-decoration-none" :to="{ name: 'detail-album', params: { duongdanhanhtrinh: a.duongdanhanhtrinh } }" title="EPIPHANY">
                                                {{ a.tenchude }}
                                            </router-link>
                                        </h3>
                                        <div class="desc_album">{{ a.tencapdoi }}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
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
                album: [],
                category: [],
            };
        },
        components:
        {
            header1,
            footer1
        },
        async created() {
            await this.getAlbum();
            await this.getcategory();
        },
        methods: {
            async getAlbum() {
                try {
                    const response = await this.$axios.get('getAlbum');
                    this.album = response.data;
                    console.log(this.album)
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu từ server', error);
                    this.$refs.toast.showToast('Lỗi khi lấy dữ liệu');
                }
            },
            async getcategory() {
                try {
                    const result = await this.$axios.get(
                        `getAllCat`
                    );
                    this.category = result.data;
                    console.log(this.category)
                } catch (e) {
                    console.log(e);
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