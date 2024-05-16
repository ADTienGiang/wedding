<template>
    <div  class="wp-block-stackable-columns stk-block-columns stk-block stk-bb17143" data-block-id="bb17143">
        <div class="stk-row stk-inner-blocks stk-block-content stk-content-align stk-bb17143-column">
            <div class="wp-block-stackable-column stk-block-column stk-column stk-block stk-c765946" data-v="4"
                data-block-id="c765946">
                <div
                    class="stk-column-wrapper stk-block-column__content stk-container stk-c765946-container stk--no-background stk--no-padding">
                    <div class="stk-block-content stk-inner-blocks stk-c765946-inner-blocks">
                        <figure class="wp-block-image size-full"><span class='ns-pinterest-image'><img decoding="async"
                                    width="1067" height="1600"
                                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201067%201600'%3E%3C/svg%3E"
                                    alt="A92 1971 - The Planners" class="wp-image-25372"
                                    data-lazy-src="https://theplannersvn.com/wp-content/uploads/2023/10/A92-1971.jpg"><noscript><img
                                        decoding="async" width="1067" height="1600"
                                        src="/src/assets/wp-content/uploads/2023/10/A92-1971.jpg"
                                        alt="A92 1971 - The Planners" class="wp-image-25372"></noscript><span
                                    class='ns-pinterest-image-button ns-rounded'
                                    data-novashare-href='https://pinterest.com/pin/create/button/?url=https%3A%2F%2Ftheplannersvn.com%2Fvi%2Fwedding-works%2Fballroom-wedding-in-hanoi-3%2F&media=https://theplannersvn.com/wp-content/uploads/2023/10/A92-1971.jpg&description=Aurora%20Of%20Grace'
                                    rel='nofollow noopener noreferrer'><svg role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z">
                                        </path>
                                    </svg><span style='margin-left: 4px;'>Pin</span></span></span>
                        </figure>
                    </div>
                </div>
            </div>



            <div class="wp-block-stackable-column stk-block-column stk-column stk-block stk-96642a7" data-v="4"
                data-block-id="96642a7">
                <div
                    class="stk-column-wrapper stk-block-column__content stk-container stk-96642a7-container stk--no-background stk--no-padding">
                    <div class="stk--column-flex stk-block-content stk-inner-blocks stk-96642a7-inner-blocks">
                        <h2 class="wp-block-heading">An epic ending for Eliza and Jason</h2>



                        <p><a href="https://theplannersvn.com/vi/?post_type=wedding-works&p=23310">A
                                romantic engagement party</a>, <a
                                href="https://theplannersvn.com/vi/styling-decor-work/elegant-vu-quy-ceremony/">an
                                exquisite traditional ceremony</a> and countless memories in
                            between all led to this – the grand wedding in Hanoi of Eliza
                            and Jason. “<a href="https://www.instagram.com/reel/CuCCc1bLIw3/" rel="noopener">Aurora Of
                                Grace</a>” was the culmination of
                            the memorable journey that The Planners had the privilege of
                            sharing with this beautiful couple.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            weddings: [],
            weddingDetail: null,
        };
    },
    async created() {
        await this.getWedding();
        this.filterWeddingByPath();
    },
    methods: {
        async getWedding() {
            try {
                const response = await this.$axios.get(`getWedding`)
                this.weddings = response.data;
                console.log(this.weddings);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu đám cưới:", error);
            }
        },
        filterWeddingByPath() {
            const path = this.$route.params.duong_dan_wedding_works;
            this.weddingDetail = this.weddings.find(wd => wd.duongdan === path);
        }
    },
}
</script>
