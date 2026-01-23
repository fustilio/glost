/**
 * Tests for SimpleRubyWord component
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SimpleRubyWord } from "../../components/index.js";
import { createGLOSTWordNode } from "glost";
import type { GLOSTWord } from "glost";

describe("SimpleRubyWord", () => {
  describe("Basic Rendering", () => {
    it("should render word text", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(<SimpleRubyWord word={word} />);

      expect(container.textContent).toContain("hello");
    });

    it("should render with transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <SimpleRubyWord word={word} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("həˈloʊ");
    });

    it("should render with translation", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <SimpleRubyWord word={word} showDefinition />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("greeting");
    });
  });

  describe("Ruby Position", () => {
    it("should render ruby over text", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <SimpleRubyWord
          word={word}
          transcriptionSystem="ipa"
          rubyPosition="over"
        />
      );

      const ruby = container.querySelector("ruby");
      expect(ruby).toBeTruthy();
    });

    it("should render ruby under text", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "สวัสดี",
        lang: "th",
        script: "thai",
        transcription: {
          rtgs: { text: "sawatdi" },
        },
      });

      const { container } = render(
        <SimpleRubyWord
          word={word}
          transcriptionSystem="rtgs"
          rubyPosition="under"
        />
      );

      const ruby = container.querySelector("ruby");
      expect(ruby).toBeTruthy();
    });
  });

  describe("Languages", () => {
    it("should render Thai word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "สวัสดี",
        lang: "th",
        script: "thai",
      });

      const { container } = render(<SimpleRubyWord word={word} />);

      expect(container.textContent).toContain("สวัสดี");
    });

    it("should render Japanese word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "こんにちは",
        lang: "ja",
        script: "hiragana",
      });

      const { container } = render(<SimpleRubyWord word={word} />);

      expect(container.textContent).toContain("こんにちは");
    });

    it("should render Korean word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "안녕하세요",
        lang: "ko",
        script: "hangul",
      });

      const { container } = render(<SimpleRubyWord word={word} />);

      expect(container.textContent).toContain("안녕하세요");
    });
  });

  describe("Custom Class Names", () => {
    it("should apply custom text class name", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(
        <SimpleRubyWord word={word} textClassName="custom-text" />
      );

      const textElement = container.querySelector(".custom-text");
      expect(textElement).toBeTruthy();
    });

    it("should apply custom ruby class name", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <SimpleRubyWord
          word={word}
          transcriptionSystem="ipa"
          rubyClassName="custom-ruby"
        />
      );

      const rubyElement = container.querySelector(".custom-ruby");
      expect(rubyElement).toBeTruthy();
    });

    it("should apply custom definition class name", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <SimpleRubyWord
          word={word}
          showDefinition
          definitionClassName="custom-definition"
        />
      );

      const definitionElement = container.querySelector(".custom-definition");
      expect(definitionElement).toBeTruthy();
    });
  });

  describe("Snapshots", () => {
    it("should match snapshot for basic word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(<SimpleRubyWord word={word} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <SimpleRubyWord word={word} transcriptionSystem="ipa" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with translation", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <SimpleRubyWord word={word} showDefinition />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
