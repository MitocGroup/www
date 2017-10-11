import config from '../config/config.cfg';
import { isVisible } from '../config/config.cfg';
import sharedFunctions from '../helpers/shared-func';
import { HomePage } from '../poms//pages/home.po';
import { StartProject, BecomePartner, Contact } from '../poms/components/forms.po';

module.exports = {
  config,
  isVisible,
  HomePage,
  sharedFunctions,
  StartProject
};
