export const fragmentShader = `
uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uRes;
uniform vec2 uImageRes;

varying vec2 vUv;
varying vec3 vPosition;

#define PI 3.14159265359

// Fonction de bruit classique
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Rotation 2D
vec2 rotate2D(vec2 position, float angle) {
    mat2 rotation = mat2(
        cos(angle), -sin(angle),
        sin(angle), cos(angle)
    );
    return rotation * position;
}

void main() {
    // Calculer la distance du centre
    vec2 center = vec2(0.5);
    vec2 toCenter = vUv - center;
    float dist = length(toCenter);
    
    // Effet de rotation du portail
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter);
    
    // Distorsion du portail
    float distortion = sin(angle * 5.0 + uTime) * 0.1 * uProgress;
    radius += distortion;
    
    // Coordonnées UV distordues
    vec2 newUV = center + vec2(cos(angle), sin(angle)) * radius;
    
    // Échantillonnage de la texture avec les nouvelles coordonnées
    vec4 tex = texture2D(uTexture, newUV);
    
    // Effet de particules
    float particleSize = 0.002;
    float particleAmount = 100.0;
    float particles = 0.0;
    
    for(float i = 0.0; i < 10.0; i++) {
        vec2 particlePos = rotate2D(
            vec2(particleSize * (i + 1.0), 0.0),
            uTime * (0.1 + i * 0.1) + i
        );
        float particle = smoothstep(0.0, particleSize,
            length(toCenter - particlePos) * particleAmount
        );
        particles += particle;
    }
    
    // Effet de lueur
    float glow = (1.0 - dist * 2.0) * uProgress;
    vec3 glowColor = vec3(0.1, 0.3, 1.0); // Couleur bleue
    
    // Mélange des effets
    vec3 portalColor = mix(
        tex.rgb,
        glowColor,
        smoothstep(0.4, 0.6, dist) * uProgress
    );
    
    // Ajout des particules
    portalColor += vec3(particles * uProgress * 0.3);
    
    // Masque circulaire pour le bouton
    float buttonMask = smoothstep(0.4, 0.45, dist);
    
    // Opacité finale
    float alpha = mix(tex.a, 1.0, buttonMask * uProgress);
    
    // Couleur finale
    gl_FragColor = vec4(portalColor, alpha);
}`; 