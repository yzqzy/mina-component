import { MinaComponent } from '../common/component';
MinaComponent({
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'mina-icon',
        },
        name: String,
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
    },
});
