import { VantComponent } from '../../../common/component';

import { LABELS } from './config/index';

VantComponent({
  props: {
    label: {
      type: Object,
      default: {},
    },
  },

  data: {
    image: LABELS.image,
  },
});
