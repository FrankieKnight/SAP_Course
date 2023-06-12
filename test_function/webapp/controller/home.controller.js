sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, UIComponent) {
    "use strict";

    return Controller.extend("testfunction.controller.home", {
      onInit: function () {
        this.getRouter()
          .getRoute("Routehome")
          .attachPatternMatched(this._onRouteMatched, this);
        this.getView().setModel(
          new JSONModel({
            items: [],
          }),
          "model1"
        );
      },

      _onRouteMatched: function () {
        this.getView()
          .getModel()
          .read("/Products", {
            // urlParameters: {
            //   $expand: "Products/Category,Products/Order_Details/Order",
            // },
            success: (res) => {
              this.getView()
                .getModel("model1")
                .setProperty("/items", res.results);
            },
            error: function (err) {
              console.log(err);
              debugger;
            },
          });
      },

      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      createColumnListItem: function (sId, oContext) {
        return new sap.m.ColumnListItem({
          type: "Navigation",
          press: this.onNav.bind(this),
          cells: [
            new sap.m.Text({
              text: "{model1>ProductName}",
            }),
            new sap.m.Text({
              text: "{model1>ProductID}",
            }),
            new sap.m.Text({
              text: "{model1>UnitPrice}",
            }),
          ],
        });

        // let oColumnListItem = null;
        // const sPath = oContext.getPath();

        // switch (sPath) {
        //   case "/items/0":
        //     oColumnListItem = new sap.m.ColumnListItem({
        //       vAlign: "Middle",
        //       cells: [
        //         new sap.m.Text({
        //           text: "{model1>ProductID}",
        //         }),
        //       ],
        //     });
        //     break;
        //   case "/items/1":
        //     oColumnListItem = new sap.m.ColumnListItem({
        //       vAlign: "Middle",
        //       cells: [
        //         new sap.m.Input({
        //           value: "{model1>UnitPrice}",
        //         }),
        //       ],
        //     });
        //     break;
        //   default:
        //     oColumnListItem = new sap.m.ColumnListItem({
        //       vAlign: "Middle",
        //       cells: [
        //         new sap.m.Text({
        //           text: "{model1>ProductName}",
        //         }),
        //       ],
        //     });
        //     break;
        // }

        // return oColumnListItem;
      },
      onNav: function (e) {
        console.log("mannaggia a ******");

        const oSource = e.getSource();
        const oContext = oSource.getBindingContext("model1");
        const categoryID = oContext.getProperty("CategoryID");
        this.getRouter().navTo("SecondPage", { id: categoryID });
      },
    });
  }
);
