module.exports = {
  plugins: [
    require("postcss-cssnext")({}),
    require("postcss-easy-import")({ prefix: "_" }),
    require("postcss-flexbugs-fixes")({}),
    require("postcss-font-magician")({}),
    require("cssnano")({
      preset: "default",
      autoprefixer: false
    })
  ]
};
