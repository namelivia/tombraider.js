import Item from "./Item";

describe("Item", () => {
  test("Test getting an item name", () => {
    const item = new Item(
      1,
      "testName",
      "testAction",
      "testParams",
      "testModel"
    );
    expect(item.getName()).toEqual("testName");
  });

  test("Test serializing an item", () => {
    const item = new Item(
      1,
      "testName",
      "testAction",
      "testParams",
      "testModel"
    );
    expect(item.serialize()).toEqual({
      index: 1,
      name: "testName",
      action: "testAction",
      params: "testParams",
      model: "testModel",
    });
  });
});
