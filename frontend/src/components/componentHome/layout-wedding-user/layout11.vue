<template>
    <template v-if="weddingDetail">
        <template v-for="part in weddingDetail.part" :key="part.id">
            <template v-if="part.stt === stt">
            <div class="wp-block-stackable-column stk-block-column stk-column stk-block stk-96642a7" data-v="4"
                data-block-id="96642a7">
                <div
                    class="stk-column-wrapper stk-block-column__content stk-container stk-96642a7-container stk--no-background stk--no-padding">
                    <div class="stk--column-flex stk-block-content stk-inner-blocks stk-96642a7-inner-blocks">
                        <h2 class="wp-block-heading">{{ part.tieudephu }}</h2>
                        <p>{{ part.noidung }}</p>
                    </div>
                </div>
            </div>
            <figure
                class="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-15 is-layout-flex wp-block-gallery-is-layout-flex">
                <figure v-for="image in part.HinhanhWedding" :key="image.id" class="wp-block-image size-large"><span
                        class='ns-pinterest-image'><img decoding="async" width="1600" height="1065" data-id="25358"
                        :src="part.HinhanhWedding[0].duongDan"                             alt="TIE 6988 - The Planners" class="wp-image-25358"
                            :data-lazy-src="image.duongDan"><noscript><img decoding="async" width="1600" height="1065"
                                data-id="25358" src="/src/assets/wp-content/uploads/2023/10/TIE_6988.jpg"
                                alt="TIE 6988 - The Planners" class="wp-image-25358"></noscript><span
                            class='ns-pinterest-image-button ns-rounded'
                            data-novashare-href='https://pinterest.com/pin/create/button/?url=https%3A%2F%2Ftheplannersvn.com%2Fvi%2Fwedding-works%2Fballroom-wedding-in-hanoi-3%2F&media=https://theplannersvn.com/wp-content/uploads/2023/10/TIE_6988.jpg&description=Aurora%20Of%20Grace'
                            rel='nofollow noopener noreferrer'><svg role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z">
                                </path>
                            </svg><span style='margin-left: 4px;'>Pin</span></span></span></figure>
            </figure>

        </template>
    </template>
</template>
</template>
<script>
export default {
    data() {
        return {
            weddings: [],
            weddingDetail: null,
        };
    },
    props: ['partData', 'stt'],
    async created() {
        await this.getWedding();
        this.filterWeddingByPath();
        console.log("Received stt:", this.stt);
    },
    methods: {
        async getWedding() {
            const response = await this.$axios.get('getWedding');
            this.weddings = response.data;
        },
        filterWeddingByPath() {
            const path = this.$route.params.duong_dan_wedding_works;
            this.weddingDetail = this.weddings.find(wd => wd.duongdan === path);
            console.log(this.weddingDetail)
        },

    },
}
</script>