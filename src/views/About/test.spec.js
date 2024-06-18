import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import About from "./index.vue";

const wrapper = mount(About);

describe("About", () => {
  it("is About a vue instance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should render Angular logo with correct attributes", () => {
    const angularLogo = wrapper.find('img[alt="Angular Logo"]');
    expect(angularLogo.exists()).toBeTruthy();
    expect(angularLogo.attributes("src")).toContain("logo-angular.svg");
    expect(angularLogo.attributes("width")).toBe("150");
  });

  it("should render Ember logo with correct attributes", () => {
    const emberLogo = wrapper.find('img[alt="Ember Logo"]');
    expect(emberLogo.exists()).toBeTruthy();
    expect(emberLogo.attributes("src")).toContain("logo-ember.svg");
    expect(emberLogo.attributes("width")).toBe("80");
  });

  it("should render React logo with correct attributes", () => {
    const reactLogo = wrapper.find('img[alt="React Logo"]');
    expect(reactLogo.exists()).toBeTruthy();
    expect(reactLogo.attributes("src")).toContain("logo-react.svg");
    expect(reactLogo.attributes("width")).toBe("90");
  });

  it("should have correct links with target and rel attributes", () => {
    const angularLink = wrapper.find(
      'a[href="https://slidecontent-angularjs.web.app"]',
    );
    expect(angularLink.exists()).toBeTruthy();
    expect(angularLink.attributes("target")).toBe("_blank");

    const emberLink = wrapper.find(
      'a[href="https://slidecontent-ember.web.app"]',
    );
    expect(emberLink.exists()).toBeTruthy();
    expect(emberLink.attributes("target")).toBe("_blank");

    const reactLink = wrapper.find(
      'a[href="https://slidecontent-reactjs.web.app"]',
    );
    expect(reactLink.exists()).toBeTruthy();
    expect(reactLink.attributes("target")).toBe("_blank");
  });
});
