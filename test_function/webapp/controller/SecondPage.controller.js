sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
  ],
  function (Controller, JSONModel, UIComponent, History) {
    "use strict";

    return Controller.extend("testfunction.controller.SecondPage", {
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onInit: function () {
        this.getRouter()
          .getRoute("SecondPage")
          .attachPatternMatched(this._onRouteMatched, this);
        this.getView().setModel(
          new JSONModel({
            categoria: {},
          }),
          "modelloSecondo"
        );
      },

      _onRouteMatched: function (e) {
        const id = e.getParameters().arguments.id;

        this.getView()
          .getModel()
          .read(`/Categories(${id})`, {
            success: (res) => {
              this.getView()
                .getModel("modelloSecondo")
                .setProperty("/categoria", res);
            },
            error: function (err) {},
          });
      },

      onNavButtonPress: function () {
        const sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          this.getRouter().navTo("Routehome", {}, true);
        }
      },
    });
  }
);
