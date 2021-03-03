/**
 * Reusable utility functional objects
 */

const Utils = {
  /**
   * Return modified array with objects sorted into categories, which are
   * mapped with identifier colors
   */
  getCategories: (list) => {
    let cc = [];
    list.map((_, i) => {
      cc[_.group_id] = _.group_id;
    });
    return cc;
  },
};

export default Utils;
