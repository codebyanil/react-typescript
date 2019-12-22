import React, { ReactNode, useState, useEffect } from 'react';

type Responsive = 'base' | 'sm' | 'md' | 'lg' | 'xl';

type Direction = 'row' | 'col' | 'row-reverse' | 'col-reverse';

type AlignItems = 'stretch' | 'start' | 'center' | 'end' | 'baseline';

type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';

type Flex = 'initial' | '1' | 'auto' | 'none';

type Wrap = 'no-wrap' | 'wrap' | 'wrap-reverse';

interface Props {
  children?: ReactNode;
  direction?: Direction | { (key: Responsive): Direction };
  alignItems?: AlignItems | { (key: Responsive): AlignItems };
  justifyContent?: JustifyContent | { (key: Responsive): JustifyContent };
  flex?: Flex | { (key: Responsive): Flex };
  wrap?: Wrap | { (key: Responsive): Flex };
}

const FlexBox = (props: Props) => {
  const [classes, setClasses] = useState('flex mx-auto');

  function generateClasses(property: any, substr: string) {
    if (property) {
      if (typeof property === 'string') return ` ${substr}-${property}`;
      let dir = '';
      if ('base' in property) dir += ` ${substr}-${property.base}`;
      if ('sm' in property) dir += ` sm\:${substr}-${property.sm}`;
      if ('lg' in property) dir += ` lg\:${substr}-${property.lg}`;
      if ('xl' in property) dir += ` xl\:${substr}-${property.xl}`;
      return dir;
    }
    return '';
  }

  useEffect(() => {
    let str = classes;
    str += generateClasses(props.direction, 'flex');
    str += generateClasses(props.alignItems, 'items');
    str += generateClasses(props.justifyContent, 'justify');
    str += generateClasses(props.flex, 'flex');
    str += generateClasses(props.wrap, 'flex');
    setClasses(str);
  }, [setClasses]);

  return <div className={classes}>{props.children}</div>;
};

export default FlexBox;
