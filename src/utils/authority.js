import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.
import {itemPermission} from '@/utils/alia';
export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  const daily_reports = proAuthority.filter(val => val.auth === itemPermission);
  daily_reports.map(val => {
    const sessionName = val.auth;
    const menu = [];
    const valMap = val => {
      const sessionName = val.auth;
      val.children &&
        val.children.map(val => {
          menu.push(val.auth);
          if (val.children) {
            valMap(val);
          }
          sessionStorage.setItem(sessionName, menu.join(','));
        });
    };
    valMap(val);
  });
  daily_reports.map(val => {
    val.children &&
      val.children.map(value => {
        const sessionName = value.auth;
        const sessionValue =
          value.children &&
          value.children.map(val => {
            if (val.auth.includes('_module')) {
              const sessionChildrenName = val.auth;
              const sessionChildrenValue = val.children && val.children.map(val => val.auth);
              sessionChildrenValue &&
                sessionStorage.setItem(sessionChildrenName, sessionChildrenValue);
              return val.auth;
            } else {
              return val.auth;
            }
          });
        sessionStorage.setItem(
          sessionName,
          sessionValue && sessionValue.filter(res => res != 'undefined')
        );
      });
  });
  reloadAuthorized();
}
