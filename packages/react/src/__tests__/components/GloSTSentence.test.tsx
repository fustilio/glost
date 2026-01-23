/**
 * Tests for GloSTSentence component
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GloSTSentence } from "../../components/index.js";
import { createGLOSTWordNode, createGLOSTSentenceNode } from "glost";
import type { GLOSTSentence } from "glost";

describe("GloSTSentence", () => {
  describe("Basic Rendering", () => {
    it("should render sentence with words", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "world", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello world",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={1} />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("world");
    });

    it("should render sentence with transcription", () => {
      const words = [
        createGLOSTWordNode({
          value: "hello",
          lang: "en",
          script: "latin",
          transcription: {
            ipa: { text: "həˈloʊ" },
          },
        }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence
          sentence={sentence}
          displayLevel={2}
          transcriptionSystem="ipa"
        />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("həˈloʊ");
    });

    it("should render sentence translation", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <GloSTSentence
          sentence={sentence}
          displayLevel={1}
          showTranslation
        />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("greeting");
    });
  });

  describe("Display Levels", () => {
    it("should render level 1 (text only)", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={1} />
      );

      expect(container.textContent).toContain("hello");
    });

    it("should render level 3 (with translation)", () => {
      const words = [
        createGLOSTWordNode({
          value: "hello",
          lang: "en",
          script: "latin",
          extras: {
            translations: {
              "en-US": "greeting",
            },
          },
        }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={3} />
      );

      expect(container.textContent).toContain("hello");
    });
  });

  describe("Languages", () => {
    it("should render Thai sentence", () => {
      const words = [
        createGLOSTWordNode({ value: "สวัสดี", lang: "th", script: "thai" }),
        createGLOSTWordNode({ value: "ครับ", lang: "th", script: "thai" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "สวัสดีครับ",
        lang: "th",
        script: "thai",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={1} />
      );

      expect(container.textContent).toContain("สวัสดี");
      expect(container.textContent).toContain("ครับ");
    });

    it("should render Japanese sentence", () => {
      const words = [
        createGLOSTWordNode({
          value: "こんにちは",
          lang: "ja",
          script: "hiragana",
        }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "こんにちは",
        lang: "ja",
        script: "hiragana",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={1} />
      );

      expect(container.textContent).toContain("こんにちは");
    });
  });

  describe("Custom Rendering", () => {
    it("should use custom word renderer", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
      });

      const customRenderWord = (word: any) => (
        <span className="custom-word">{word.children[0].value}</span>
      );

      const { container } = render(
        <GloSTSentence
          sentence={sentence}
          displayLevel={1}
          renderWord={customRenderWord}
        />
      );

      const customWord = container.querySelector(".custom-word");
      expect(customWord).toBeTruthy();
    });

    it("should use custom translation renderer", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const customRenderTranslation = (trans: string) => (
        <div className="custom-translation">{trans}</div>
      );

      const { container } = render(
        <GloSTSentence
          sentence={sentence}
          displayLevel={1}
          showTranslation
          renderTranslation={customRenderTranslation}
        />
      );

      const customTranslation = container.querySelector(".custom-translation");
      expect(customTranslation).toBeTruthy();
    });
  });

  describe("Snapshots", () => {
    it("should match snapshot for basic sentence", () => {
      const words = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "world", lang: "en", script: "latin" }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello world",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence sentence={sentence} displayLevel={1} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with transcription", () => {
      const words = [
        createGLOSTWordNode({
          value: "hello",
          lang: "en",
          script: "latin",
          transcription: {
            ipa: { text: "həˈloʊ" },
          },
        }),
      ];

      const sentence: GLOSTSentence = createGLOSTSentenceNode({
        originalText: "hello",
        lang: "en",
        script: "latin",
        children: words,
      });

      const { container } = render(
        <GloSTSentence
          sentence={sentence}
          displayLevel={2}
          transcriptionSystem="ipa"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
