// Type definitions for the JSON configurations in the Prisma schema

export type ThemeConfig = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
  };
  // other css variables...
}

export type SceneConfig = {
  background: {
    type: 'color' | 'image' | 'video' | 'gradient';
    value: string;
  };
  transition: {
    type: 'fade' | 'slide' | 'zoom' | 'dissolve' | 'push';
    duration: number; // in seconds
  };
  audio?: {
    url: string;
    autoplay: boolean;
    loop: boolean;
  };
}

export type ElementContent = {
  text?: string;
  url?: string; // for images, videos
  html?: string;
  [key: string]: any;
}

export type ElementTransform = {
  x: number;
  y: number;
  width: number | 'auto';
  height: number | 'auto';
  rotation: number; // in degrees
}

export type ElementStyle = {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  borderRadius?: number;
  zIndex?: number;
  [key: string]: any;
}

export type ElementAnimation = {
  entrance?: {
    type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'pop' | 'rotate' | 'typewriter';
    duration: number;
    delay: number;
    easing: string;
  };
  exit?: {
    type: 'fade' | 'slide' | 'shrink' | 'rotate' | 'dissolve';
    duration: number;
    delay: number;
    easing: string;
  };
  continuous?: {
    type: 'float' | 'pulse' | 'shake' | 'swing' | 'glow';
    duration: number;
    repeat: 'infinity' | number;
  };
}

export type InteractionAction = {
  type: 'play_animation' | 'play_sound' | 'reveal' | 'hide' | 'change_state' | 'next_scene' | 'previous_scene' | 'go_to_scene' | 'trigger_confetti' | 'open' | 'close';
  targetId?: string; // Element ID to apply action to, if applicable
  payload?: any;
}

export type ElementInteraction = {
  trigger: 'tap' | 'click' | 'swipe' | 'hold' | 'scene_enter' | 'element_visible';
  actions: InteractionAction[];
}
