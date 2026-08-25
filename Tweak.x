#import "Tweak.h"
#import <objc/runtime.h>

#define IOS18_SQUIRCLE_RADIUS 26.0f
#define IOS18_HERO_CARD_HEIGHT 156.0f

#ifndef kCACornerCurveContinuous
#define kCACornerCurveContinuous @"continuous"
#endif

#pragma mark - Helper Functions

static inline void applyContinuousCurve(UIView *view, CGFloat radius) {
    if (!view) return;
    view.layer.cornerCurve = kCACornerCurveContinuous;
    view.layer.cornerRadius = radius;
    view.layer.masksToBounds = YES;
    view.clipsToBounds = YES;
}

static void morphViewToiOS18(UIView *view) {
    if (!view) return;
    CGRect bounds = view.bounds;
    if (bounds.size.width <= 0 || bounds.size.height <= 0) return;

    // Detect 1x1 small modules (Flashlight, Timer, Low Power, Camera, Shazam, Screen Record, etc.)
    if (bounds.size.width <= 82.0f && bounds.size.height <= 82.0f) {
        CGFloat circleRadius = MIN(bounds.size.width, bounds.size.height) / 2.0f;
        applyContinuousCurve(view, circleRadius);
    } else {
        // 2x2 platter or Focus 2x1 platter
        applyContinuousCurve(view, IOS18_SQUIRCLE_RADIUS);
    }
}

#pragma mark - Settings Hero Card View

@implementation iOS18SettingsHeroCardView {
    UIVisualEffectView *_blurBackgroundView;
    UIImageView *_iconImageView;
    UILabel *_titleLabel;
    UILabel *_descriptionLabel;
}

- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName {
    self = [super initWithFrame:CGRectMake(16.0f, 8.0f, [UIScreen mainScreen].bounds.size.width - 32.0f, IOS18_HERO_CARD_HEIGHT)];
    if (self) {
        applyContinuousCurve(self, 24.0f);
        
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemThinMaterial];
        _blurBackgroundView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
        _blurBackgroundView.frame = self.bounds;
        _blurBackgroundView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        [self addSubview:_blurBackgroundView];
        
        self.layer.borderWidth = 0.5f;
        self.layer.borderColor = [UIColor colorWithWhite:1.0f alpha:0.15f].CGColor;
        
        UIView *iconContainer = [[UIView alloc] initWithFrame:CGRectMake((self.bounds.size.width - 54.0f) / 2.0f, 16.0f, 54.0f, 54.0f)];
        applyContinuousCurve(iconContainer, 14.0f);
        iconContainer.backgroundColor = [UIColor colorWithRed:0.55f green:0.55f blue:0.58f alpha:0.25f];
        [self addSubview:iconContainer];
        
        _iconImageView = [[UIImageView alloc] initWithFrame:CGRectMake(11.0f, 11.0f, 32.0f, 32.0f)];
        _iconImageView.contentMode = UIViewContentModeScaleAspectFit;
        _iconImageView.tintColor = [UIColor whiteColor];
        UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithPointSize:26.0 weight:UIImageSymbolWeightMedium];
        _iconImageView.image = [UIImage systemImageNamed:iconName withConfiguration:config];
        [iconContainer addSubview:_iconImageView];
        
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(16.0f, 78.0f, self.bounds.size.width - 32.0f, 24.0f)];
        _titleLabel.text = title;
        _titleLabel.textAlignment = NSTextAlignmentCenter;
        _titleLabel.font = [UIFont systemFontOfSize:19.0f weight:UIFontWeightBold];
        _titleLabel.textColor = [UIColor labelColor];
        [self addSubview:_titleLabel];
        
        _descriptionLabel = [[UILabel alloc] initWithFrame:CGRectMake(20.0f, 104.0f, self.bounds.size.width - 40.0f, 36.0f)];
        _descriptionLabel.text = desc;
        _descriptionLabel.textAlignment = NSTextAlignmentCenter;
        _descriptionLabel.numberOfLines = 2;
        _descriptionLabel.font = [UIFont systemFontOfSize:13.0f weight:UIFontWeightRegular];
        _descriptionLabel.textColor = [UIColor secondaryLabelColor];
        [self addSubview:_descriptionLabel];
    }
    return self;
}

@end

#pragma mark - Control Center Hooks

%group ControlCenterHooks

// Platter Outer Container
%hook CCUIContentModuleContainerView

- (void)layoutSubviews {
    %orig;
    morphViewToiOS18(self);

    if ([self respondsToSelector:@selector(backgroundMaterialView)]) {
        UIView *bg = (UIView *)[self backgroundMaterialView];
        if (bg) morphViewToiOS18(bg);
    }
    
    if ([self respondsToSelector:@selector(contentView)]) {
        UIView *content = [self contentView];
        if (content) morphViewToiOS18(content);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect b = self.bounds;
    if (b.size.width > 0 && b.size.width <= 82.0f) {
        %orig(MIN(b.size.width, b.size.height) / 2.0f);
    } else {
        %orig(IOS18_SQUIRCLE_RADIUS);
    }
}

%end

// Content Sub-Container
%hook CCUIContentModuleContentContainerView

- (void)layoutSubviews {
    %orig;
    morphViewToiOS18(self);

    if ([self respondsToSelector:@selector(contentView)]) {
        UIView *content = [self contentView];
        if (content) morphViewToiOS18(content);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect b = self.bounds;
    if (b.size.width > 0 && b.size.width <= 82.0f) {
        %orig(MIN(b.size.width, b.size.height) / 2.0f);
    } else {
        %orig(IOS18_SQUIRCLE_RADIUS);
    }
}

%end

// 1x1 Toggle Module Buttons (Flashlight, Low Power, Timer, Camera, Shazam, etc.)
%hook CCUIButtonModuleView

- (void)layoutSubviews {
    %orig;
    morphViewToiOS18(self);

    for (UIView *sub in self.subviews) {
        morphViewToiOS18(sub);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    CGRect b = self.bounds;
    if (b.size.width > 0 && b.size.height > 0) {
        %orig(MIN(b.size.width, b.size.height) / 2.0f);
    } else {
        %orig(radius);
    }
}

- (void)_setCornerRadius:(CGFloat)radius {
    CGRect b = self.bounds;
    if (b.size.width > 0 && b.size.height > 0) {
        %orig(MIN(b.size.width, b.size.height) / 2.0f);
    } else {
        %orig(radius);
    }
}

%end

// Standalone Circular Buttons
%hook CCUIRoundButton

- (void)layoutSubviews {
    %orig;
    CGFloat r = MIN(self.bounds.size.width, self.bounds.size.height) / 2.0f;
    applyContinuousCurve(self, r);

    UIView *bg = nil;
    if ([self respondsToSelector:@selector(normalStateBackgroundView)]) {
        bg = [self normalStateBackgroundView];
    }
    if (bg) {
        applyContinuousCurve(bg, r);
    }
}

%end

// Brightness & Volume Sliders
%hook CCUIContinuousSliderView

- (void)layoutSubviews {
    %orig;
    applyContinuousCurve(self, IOS18_SQUIRCLE_RADIUS);

    if ([self respondsToSelector:@selector(valueIndicatorClippingView)]) {
        UIView *v = [self valueIndicatorClippingView];
        if (v) applyContinuousCurve(v, IOS18_SQUIRCLE_RADIUS);
    }
    
    if ([self respondsToSelector:@selector(backgroundView)]) {
        UIView *bg = [self backgroundView];
        if (bg) applyContinuousCurve(bg, IOS18_SQUIRCLE_RADIUS);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    %orig(IOS18_SQUIRCLE_RADIUS);
}

%end

%end

#pragma mark - Settings App Hooks

%group SettingsHooks

%hook PSListController

- (void)viewDidLoad {
    %orig;
    
    NSString *title = self.title ?: @"";
    NSString *specID = @"";
    if ([self respondsToSelector:@selector(specifier)]) {
        PSSpecifier *sp = [self specifier];
        if (sp && [sp respondsToSelector:@selector(identifier)]) {
            specID = [sp identifier] ?: @"";
        }
    }
    
    if ([title isEqualToString:@"General"] || [specID isEqualToString:@"General"] || [self isKindOfClass:objc_getClass("GeneralController")]) {
        iOS18SettingsHeroCardView *heroCard = [[iOS18SettingsHeroCardView alloc] 
            initWithTitle:@"General"
            description:@"Manage overall setup and preferences for iPhone, such as AirDrop, CarPlay, Language, and Software Update."
            iconName:@"gearshape.fill"];
        
        UIView *headerWrap = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, IOS18_HERO_CARD_HEIGHT + 16.0f)];
        [headerWrap addSubview:heroCard];
        self.table.tableHeaderView = headerWrap;
    }
}

- (void)viewWillAppear:(BOOL)animated {
    %orig(animated);
    if (self.table) {
        self.table.separatorInset = UIEdgeInsetsMake(0, 56.0f, 0, 16.0f);
        self.table.layoutMargins = UIEdgeInsetsMake(0, 16.0f, 0, 16.0f);
    }
}

%end

%hook PSTableCell

- (void)layoutSubviews {
    %orig;
    applyContinuousCurve(self, 16.0f);
    
    UIImageView *iv = nil;
    if ([self respondsToSelector:@selector(iconImageView)]) {
        iv = [self iconImageView];
    } else {
        iv = self.imageView;
    }
    
    if (iv) {
        applyContinuousCurve(iv, 7.0f);
    }
}

- (void)_setContinuousCornerRadius:(CGFloat)radius {
    %orig(16.0f);
}

%end

%end

#pragma mark - Constructor

%ctor {
    @autoreleasepool {
        NSString *bid = [[NSBundle mainBundle] bundleIdentifier];
        
        // SpringBoard & ControlCenterUI hook
        if ([bid isEqualToString:@"com.apple.springboard"] || 
            [bid isEqualToString:@"com.apple.ControlCenterUI"] ||
            [bid isEqualToString:@"com.apple.ControlCenterServices"]) {
            %init(ControlCenterHooks);
        }
        
        // Preferences / Settings App hook
        if ([bid isEqualToString:@"com.apple.Preferences"]) {
            %init(SettingsHooks);
        }
    }
}
