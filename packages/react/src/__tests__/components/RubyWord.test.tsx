/**
 * Tests for RubyWord component
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RubyWord } from "../../components/index.js";
import { createGLOSTWordNode } from "glost";
import type { GLOSTWord } from "glost";

describe("RubyWord", () => {
  describe("Display Levels", () => {
    it("should render level 1 (text only)", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} />
      );

      expect(container.textContent).toContain("hello");
    });

    it("should render level 2 (text + transcription)", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("həˈloʊ");
    });

    it("should render level 3 (text + transcription + translation)", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={3} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("həˈloʊ");
      expect(container.textContent).toContain("greeting");
    });

    it("should render level 4 (text + transcription + translation + POS)", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
        metadata: {
          partOfSpeech: "interjection",
        },
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={4} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
      expect(container.textContent).toContain("interjection");
    });

    it("should render level 5 (all metadata)", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
        metadata: {
          partOfSpeech: "interjection",
        },
        extras: {
          translations: {
            "en-US": "greeting",
          },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={5} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
    });
  });

  describe("Transcription Systems", () => {
    it("should render with IPA transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("həˈloʊ");
    });

    it("should render with RTGS transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "สวัสดี",
        lang: "th",
        script: "thai",
        transcription: {
          rtgs: { text: "sawatdi" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="rtgs" />
      );

      expect(container.textContent).toContain("สวัสดี");
      expect(container.textContent).toContain("sawatdi");
    });

    it("should render with romaji transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "こんにちは",
        lang: "ja",
        script: "hiragana",
        transcription: {
          romaji: { text: "konnichiwa" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="romaji" />
      );

      expect(container.textContent).toContain("こんにちは");
      expect(container.textContent).toContain("konnichiwa");
    });
  });

  describe("Languages", () => {
    it("should render Thai word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "สวัสดี",
        lang: "th",
        script: "thai",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} />
      );

      expect(container.textContent).toContain("สวัสดี");
    });

    it("should render Japanese word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "こんにちは",
        lang: "ja",
        script: "hiragana",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} />
      );

      expect(container.textContent).toContain("こんにちは");
    });

    it("should render Korean word", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "안녕하세요",
        lang: "ko",
        script: "hangul",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} />
      );

      expect(container.textContent).toContain("안녕하세요");
    });
  });

  describe("Edge Cases", () => {
    it("should handle word without transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} />
      );

      expect(container.textContent).toContain("hello");
    });

    it("should handle word without translation", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={3} transcriptionSystem="ipa" />
      );

      expect(container.textContent).toContain("hello");
    });

    it("should handle custom className", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} className="custom-class" />
      );

      const element = container.querySelector(".custom-class");
      expect(element).toBeTruthy();
    });
  });

  describe("Snapshots", () => {
    it("should match snapshot for level 1", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={1} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot for level 2 with transcription", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "hello",
        lang: "en",
        script: "latin",
        transcription: {
          ipa: { text: "həˈloʊ" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="ipa" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot for Thai word with RTGS", () => {
      const word: GLOSTWord = createGLOSTWordNode({
        value: "สวัสดี",
        lang: "th",
        script: "thai",
        transcription: {
          rtgs: { text: "sawatdi" },
        },
      });

      const { container } = render(
        <RubyWord word={word} displayLevel={2} transcriptionSystem="rtgs" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
