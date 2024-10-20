export type WindowSize = 'desktop' | 'tablet' | 'mobile' | 'desktopLowRes';

export type WindowDimensions = {
  width: number;
  height: number;
}

export type UseWindowDimensionsReturn = {
  windowDimensions: WindowDimensions;
  windowSize: WindowSize;
  isDesktopView: boolean;
}
