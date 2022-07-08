import { MinaComponent } from '../../../common/component';

import { LABELS } from './config/index';

MinaComponent({
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
