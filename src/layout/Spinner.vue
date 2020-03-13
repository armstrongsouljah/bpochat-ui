<template>
    <div class="right" v-show="isLoading">
        <span class="fa-3x"><i class="fas fa-spinner fa-spin"></i></span>
    </div>
</template>
<script>
export default {
    name: 'Loader',
    props: {
        isLoading: Boolean
    }
}
</script>