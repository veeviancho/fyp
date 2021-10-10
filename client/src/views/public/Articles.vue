<template>
    <div>
        <PageTitle/>
        <Article/>
    </div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
import Article from '@/components/public/Articles.vue'

export default {
    components: {
        PageTitle,
        Article
    }
}
</script>